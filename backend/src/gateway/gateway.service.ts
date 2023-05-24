import { OnModuleInit, BadRequestException, Logger } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from "src/dtos/create-message.dto";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@WebSocketGateway(3001, { cors: { origin: ['http://localhost:5173'] } })

export class GatewayService implements OnModuleInit {
  private logger: Logger;

  constructor(@InjectRepository(Message) private repo: Repository<Message>) {
    this.logger = new Logger(GatewayService.name);
  }

  @WebSocketServer()
  io: Server;

  onModuleInit() {
    this.logger.log('Gateway initialized');
  }

  handleConnection(socket: Socket) {
    this.logger.log('id: ' + socket.id + ' connected');
  }

  handleDisconnect(socket: Socket) {
    this.logger.log('id: ' + socket.id + ' disconnected');
  }


  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: CreateMessageDto) {
    const dto = plainToClass(CreateMessageDto, body, { excludeExtraneousValues: true });

    try {
      await this.validateDto(dto);
      const message = this.createMessage(dto);
      await this.repo.save(message);
      this.emitNewMessageEvent(body);
    } catch (error) {
      this.handleValidationError(error);
    }
  }

  private async validateDto(dto: CreateMessageDto): Promise<void> {
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }
  }

  private createMessage(dto: CreateMessageDto): Message {
    return this.repo.create({
      room: dto.room,
      username: dto.username,
      content: dto.content,
    });
  }

  private emitNewMessageEvent(body: CreateMessageDto): void {
    this.io.emit('onMessage', {
      msg: 'New message',
      content: body.content,
    });
  }

  private handleValidationError(error: any): void {
    if (error! instanceof BadRequestException) {
      this.io.emit('errorPopup', {
        msg: 'Error',
        content: error,
      });
    } else {
      this.logger.error(new BadRequestException('Wrong format'));
    }
  }
}
