import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/enum/user-role.enum';

@Injectable()
export class ProjectHolderAuthGuard extends AuthGuard('jwt') {
   public canActivate(context: ExecutionContext) {
      return super.canActivate(context);
   }

   public handleRequest(err, user, info) {
      if (err || !user)
         throw (err || new HttpException('Merci de vous authentifiez', HttpStatus.UNAUTHORIZED));
      else if (!user.active)
         throw new HttpException('Votre compte est désactivé', HttpStatus.UNAUTHORIZED);
      else if (user.role !== UserRole.PROJET_HOLDER)
         throw new HttpException('Vous êtes pas autorisés à accéder à cette resource', HttpStatus.FORBIDDEN);
      return user;
   }
}