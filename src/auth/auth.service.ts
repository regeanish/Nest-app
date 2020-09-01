import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepository:UserRepository,
        private jwtService:JwtService
    ) {}

    public async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void> {
        return this._userRepository.signUp(authCredentialsDto);
    }

    public async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}> {
        // {"username":"ariel", "password":"Aaaaa@123!#"}
        const username = await this._userRepository.validateUserPassword(authCredentialsDto);
        // console.log(username);
        if(!username) throw new UnauthorizedException('Invalid credentials'); // dont tell the hackers that username or password incorrect
        
        const payload:JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken};

    }
}
