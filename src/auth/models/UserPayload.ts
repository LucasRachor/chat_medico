export interface UserPayload {
    sub: string;
    username: string;
    role: string;
    iat?: number;
    exp?: number;
}