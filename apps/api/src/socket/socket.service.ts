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

  @OnEvent('sound.data')
  handleSoundData(soundData: any) {
    console.log('Broadcasting sound data:', soundData);
    this.server.emit('sound', soundData);
  }
}
