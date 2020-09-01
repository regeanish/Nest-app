import { IsNotEmpty, MaxLength, MinLength, IsString, Matches } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    {message: 'Password is too weak'}
    ) // https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
    password:string;
}