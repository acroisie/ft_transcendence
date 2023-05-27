import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Channel } from 'src/entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel])],
  controllers: [],
  providers: [GatewayService],
})
export class GatewayModule {}
