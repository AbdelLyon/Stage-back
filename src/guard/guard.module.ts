import { Module } from '@nestjs/common';
import { AdminAndManagerAuthGuard } from 'src/guard/admin-and-manager-auth.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { ManagerAuthGuard } from './manager-auth.guard';

@Module({
  imports: [],
  providers: [JwtAuthGuard, AdminAuthGuard, ManagerAuthGuard, AdminAndManagerAuthGuard],
  exports: [JwtAuthGuard, AdminAuthGuard, ManagerAuthGuard, AdminAndManagerAuthGuard],
})
export class GuardModule { }
