import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'mqtt';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SoundService implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  private client;
  constructor() {
    this.client = connect('mqtt://localhost:1883', {
      clientId: 'sound-service',
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on('connect', () => {
      console.log('Connected to broker');
    });

    this.client.on('error', (error) => {
      console.error('Connection error:', error);
    });
  }

  onModuleInit() {
    this.client.subscribe('sound', (err) => {
      if (err) {
        console.error('Error subscribing to sound topic:', err);
        return;
      }
      console.log('subscribe to sound topic');
    });

    this.client.on('message', (topic, message) => {
      if (topic == 'sound') {
        try {
          const soundData = JSON.parse(message.toString());
          this.handleSoundData(soundData);
        } catch (error) {
          console.error('Error parsing sound data:', error);
        }
      }
    });
  }

  private handleSoundData(soundData: any) {
    console.log('Received sound data:', soundData);

    this.server.emit('sound', soundData);
  }
}
