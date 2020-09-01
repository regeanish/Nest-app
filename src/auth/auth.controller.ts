import { Controller, Post, Body, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
// import { GetUser } from './get-user.decorator';
// import { User } from './user.entity';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private _authService:AuthService
    ) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<void> { 
        return this._authService.signUp(authCredentialsDto); 
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}> { 
        return this._authService.signIn(authCredentialsDto); 
    }


    // @Post('/test')
    // @UseGuards(AuthGuard()) // refer to jwtStrategy created
    // test(@GetUser() user:User){
    //     console.log(user);

    // }

    
}
