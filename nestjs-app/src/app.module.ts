// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MqttModule } from './mqtt/mqtt.module';
import { SoundModule } from './sound/sound.module';
import { WebsocketModule } from './socket/socket.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EventEmitterModule.forRoot(),
    SoundModule,
    MqttModule,
    WebsocketModule,
  ],
})
export class AppModule {}
