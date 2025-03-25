import { Request } from "express";

// Definir um tipo genérico para os usuários
type AuthenticatedUser = {
    id: string;
    username: string;
    role: string;
    userType: 'paciente' | 'medico' | 'enfermeiro';
};

export class AuthRequest extends Request {
    user: AuthenticatedUser;
}
