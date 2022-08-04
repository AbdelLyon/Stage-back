import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err, user, info) {
    if (err || !user) throw (err || new HttpException('Merci de vous authentifiez', HttpStatus.UNAUTHORIZED));
    else if (!user.active) throw new HttpException('Votre compte est désactivé', HttpStatus.UNAUTHORIZED);
    return user;
  }
}
