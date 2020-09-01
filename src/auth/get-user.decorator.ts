


// get user object if the token validation succeeds


import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';


export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});