import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [],
  providers: [GatewayService],
})
export class GatewayModule {}
