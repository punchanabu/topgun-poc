import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;
  constructor(private eventEmitter: EventEmitter2) {
    this.client = connect('mqtt://broker.hivemq.com:1883', {
      clientId: 'mqtt-service',
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
    this.client.subscribe('testzy/signalzzz', (err) => {
      if (err) {
        console.error('Error subscribing to sound topic:', err);
        return;
      }
      console.log('subscribe to sound topic');
    });

    this.client.on('message', (topic, message) => {
      if (topic == 'testzy/signalzzz') {
        try {
          const soundData = JSON.parse(message.toString());
          console.log('Received sound data:', soundData);
          this.eventEmitter.emit('sound', soundData);
        } catch (error) {
          console.error('Error parsing sound data:', error);
        }
      }
    });
  }
}
