import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';


@Injectable()
export class GatewayService {
	@WebSocketServer()
	server: Server;
}
