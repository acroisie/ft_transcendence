import { BadRequestException, OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from "src/dtos/create-message.dto";
import { validate } from 'class-validator';

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

		/*Mehd: Pense aux plainToClass 
		avec le le extreneousfiled à desactive
		 pour avoir des objets sans champs supplémentaires*/

		const dto = new CreateMessageDto();
		dto.username = body.username;
		dto.room = body.room;
		dto.content = body.content;

		const errors = await validate(dto);
		if (errors.length > 0) {
			const errorMessages = errors.map((error) => Object.values(error.constraints));
			console.log(errorMessages);
			this.server.emit('errorPopup', {
				msg: 'Error',
				content: errorMessages,
			});
			return;
		}

		const message = this.messageRepository.create({
			room: dto.room,
			username: dto.username,
			content: dto.content,
		});
		await this.messageRepository.save(message);

		// this.server.to(body.room).emit('onMessage', {
		// 	msg: 'New message',
		// 	content: body,
		// });
		this.server.emit('onMessage', {
			msg: 'New message',
			content: body,
		})
	}
}