import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private _logger = new Logger();

    constructor(
        @InjectRepository(UserRepository)
        private _userRepository:UserRepository,
        private jwtService:JwtService
    ) {}

    public async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void> {
        return this._userRepository.signUp(authCredentialsDto);
    }

    public async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}> {
        const username = await this._userRepository.validateUserPassword(authCredentialsDto);
        if(!username) throw new UnauthorizedException('Invalid credentials'); // dont tell the hackers that username or password incorrect
        const payload:JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
        this._logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
        return {accessToken};

    }
}
