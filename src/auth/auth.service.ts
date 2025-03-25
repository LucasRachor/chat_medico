import { UserPayload } from './models/UserPayload';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { Injectable } from '@nestjs/common';
import { UserLogin } from './models/UserLogin';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: UserLogin): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            username: user.username,
            role: user.role
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        };
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findUserByUsername(username);

        if (user) {

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        } throw new Error('Nome de usuário ou senha incorreto! ')
    }

}
