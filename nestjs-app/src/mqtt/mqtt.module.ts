import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MqttService } from './mqtt.service';
import { SoundModule } from '../sound/sound.module';
import { SoundData, SoundDataSchema } from '../model/sound.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SoundData.name, schema: SoundDataSchema },
    ]),
    EventEmitterModule.forRoot(),
    SoundModule,
  ],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
