import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Module({
  providers: [MqttService, EventEmitter2],
  exports: [MqttService],
})
export class MqttModule {}
