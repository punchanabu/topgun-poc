import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SoundGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('sound')
  handleSoundData(data: any) {
    this.server.emit('sound', data);
  }
}
