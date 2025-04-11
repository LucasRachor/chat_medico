import { Request } from "express";

type AuthenticatedUser = {
    id: string;
    username: string;
    role: string;
    userType: 'paciente' | 'medico' | 'enfermeiro';
    nome_completo: string;
};

export class AuthRequest extends Request {
    user: AuthenticatedUser;
}
