import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface PatientQueue {
  pacienteId: string;
  nomeCompleto: string;
  idade: number;
  genero: string;
  peso: number;
  horaChegada: string;
}

@WebSocketGateway({
  cors: {
    origin: "*" //process.env.FRONT_END_URL,
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private queue: PatientQueue[] = [];
  private activeChats = new Map<string, string>();
  private patientSockets = new Map<string, string>();

  @SubscribeMessage('getQueue')
  handleGetQueue(
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`\n📋 [Médico] Solicitou a lista de pacientes na fila`);
    console.log(`📌 [Fila Atual]`, JSON.stringify(this.queue, null, 2));

    client.emit('queueList', {
      queue: this.queue,
      timestamp: new Date().toISOString()
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { sala: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`\n🔵 [Entrou na Sala] Socket ${client.id} entrou na sala ${data.sala}`);
    client.join(data.sala);
  }

  @SubscribeMessage('enterQueue')
  handleEnterQueue(
    @MessageBody() patient: {
      pacienteId: string;
      nomeCompleto: string;
      idade: number;
      genero: string;
      pesoTotal: number;
      horaChegada: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`\n🟢 [Paciente] ${patient.nomeCompleto} (${patient.pacienteId}) entrou na fila.`);

    this.patientSockets.set(patient.pacienteId, client.id);
    console.log(`Paciente ${patient.pacienteId} registrado com socket ID: ${client.id}`);

    if (this.queue.some(p => p.pacienteId === patient.pacienteId)) {
      console.log(`⚠️ [Erro] Paciente ${patient.pacienteId} já está na fila.`);
      return client.emit('error', { message: 'Paciente já está na fila.' });
    }

    const newPatient: PatientQueue = {
      ...patient,
      peso: patient.pesoTotal,
    };

    this.queue.push(newPatient);
    client.broadcast.emit('updateQueue', this.queue);
  }

  @SubscribeMessage('leaveQueue')
  handleLeaveQueue(
    @MessageBody() data: { pacienteId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`\n🔴 [Paciente] ${data.pacienteId} saiu da fila.`);

    this.queue = this.queue.filter(p => p.pacienteId !== data.pacienteId);
    this.patientSockets.delete(data.pacienteId);

    console.log(`📌 [Fila Atualizada]`, JSON.stringify(this.queue, null, 2));
    client.broadcast.emit('updateQueue', this.queue);
  }

  // medico aceita um paciente
  @SubscribeMessage('acceptPatient')
  handleAcceptPatient(
    @MessageBody() data: { pacienteId: string; medicoId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`\n🟠 [Médico] ${data.medicoId} aceitou o paciente ${data.pacienteId}`);

    const patientIndex = this.queue.findIndex(p => p.pacienteId === data.pacienteId);
    if (patientIndex === -1) {
      console.log(`❌ [Erro] Paciente ${data.pacienteId} não encontrado na fila.`);
      return client.emit('error', { message: 'Paciente não encontrado na fila.' });
    }

    const [patient] = this.queue.splice(patientIndex, 1); // Remove da fila

    // Atualiza fila para todos, exceto o médico que aceitou
    client.broadcast.emit('updateQueue', this.queue);

    const sala = `chat-${data.pacienteId}-${data.medicoId}`;
    this.activeChats.set(data.pacienteId, data.medicoId);
    console.log(`💬 [Chat Criado] Sala: ${sala}`);

    client.join(sala);

    const patientSocketId = this.patientSockets.get(data.pacienteId);
    if (patientSocketId) {
      const patientSocket = this.server.sockets.sockets.get(patientSocketId);
      if (patientSocket) {
        patientSocket.join(sala);
        patientSocket.emit('acceptPatient', { medicoId: data.medicoId });
      }
    } else {
      console.log(`❌ [Erro] Não foi possível encontrar o socket do paciente ${data.pacienteId}`);
    }
  }


  // enviar mensagem no chat
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() mensagem: { sala: string; remetenteId: string; mensagem: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`\n✉️ [Mensagem] Sala: ${mensagem.sala}, Remetente: ${mensagem.remetenteId}, Texto: ${mensagem.mensagem}`);

    if (!mensagem.sala || !mensagem.remetenteId || !mensagem.mensagem) {
      console.log(`❌ [Erro] Mensagem inválida recebida:`, mensagem);
      return client.emit('error', { mensagem: 'Dados da mensagem são inválidos.' });
    }

    // Alterado para emitir o evento 'message' em vez de 'receiveMessage'
    this.server.to(mensagem.sala).emit('message', {
      remetenteId: mensagem.remetenteId,
      mensagem: mensagem.mensagem
    });
  }

  @SubscribeMessage('endChat')
  handleEndChat(
    @MessageBody() data: { sala: string; pacienteId: string; medicoId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`\n🔴 [Chat Encerrado] Sala: ${data.sala}`);

    // Remove o chat da lista de chats ativos
    this.activeChats.delete(data.pacienteId);

    // Remove os participantes da sala
    client.leave(data.sala);

    // Notifica todos os participantes que o chat foi encerrado
    this.server.to(data.sala).emit('chatEnded', {
      sala: data.sala,
      pacienteId: data.pacienteId,
      medicoId: data.medicoId,
      timestamp: new Date().toISOString()
    });

    console.log(`✅ [Chat Finalizado] Sala ${data.sala} encerrada com sucesso.`);
  }
}
