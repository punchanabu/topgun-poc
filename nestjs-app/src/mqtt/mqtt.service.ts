// src/mqtt/mqtt.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoundDataService } from '../sound/sound.service';
import { SoundData } from '../model/sound.model';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;

  constructor(
    private eventEmitter: EventEmitter2,
    private soundDataService: SoundDataService,
    @InjectModel(SoundData.name) private soundDataModel: Model<SoundData>,
  ) {
    this.client = connect(process.env.MQTT_BROKER, {
      clientId: `mqtt-client-${Math.random().toString(16).slice(2, 8)}`,
      clean: true,
      connectTimeout: 4000,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 1000,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error) => {
      console.error('Connection error:', error);
    });
  }

  onModuleInit() {
    this.client.subscribe('device/messages', (err) => {
      if (err) {
        console.error('Error subscribing to topic:', err);
        return;
      }
      console.log('Subscribed to device/messages topic');
    });

    this.client.on('message', async (topic, message) => {
      if (topic === 'device/messages') {
        try {
          const soundData = new this.soundDataModel({
            data: message.toString(),
            timestamp: new Date(),
          });
          console.log('receive sound-data', soundData.data);
          await this.soundDataService.saveSoundData(soundData);
          this.eventEmitter.emit('sound', message.toString());
          console.log('Sound data saved successfully');
        } catch (error) {
          console.error('Error processing sound data:', error);
        }
      }
    });
  }
}
