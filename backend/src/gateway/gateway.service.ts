import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from "src/dtos/create-message.dto";

@WebSocketGateway(3001, { cors: { origin: ['http://localhost:5173'] } })

export class GatewayService implements OnModuleInit {
	constructor(@InjectRepository(Message) private messageRepository: Repository<Message>,) { }

	@WebSocketServer()
	server: Server;

	async onModuleInit() {
		this.server.on('connection', (socket) => {
			console.log(socket.id);
			console.log('Connected');
		});
	}

	@SubscribeMessage('newMessage')
	async onNewMessage(@MessageBody() body: CreateMessageDto) {
		console.log(body); //To delete

		const message = this.messageRepository.create({
			room: body.room,
			username: body.username,
			content: body.content,
		});

		await this.messageRepository.save(message);

		this.server.to(body.room).emit('onMessage', {
			msg: 'New message',
			content: body,
		});
	}
}