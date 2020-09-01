import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from './user.respository';
import { User } from './user.entity';
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private _userRespository:UserRepository
    ) {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'topSecret51'
        })
    }

        async validate(payload:JwtPayload):Promise<User> {
            const {username } = payload;
            const user = await this._userRespository.findOne({username});

            if(!user){
                throw new UnauthorizedException();
            }

            return user;
        }
}