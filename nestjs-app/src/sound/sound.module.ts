// src/sound/sound.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoundData, SoundDataSchema } from '../model/sound.model';
import { SoundDataService } from './sound.service';
import { SoundDataRepository } from './sound.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SoundData.name, schema: SoundDataSchema },
    ]),
  ],
  providers: [SoundDataService, SoundDataRepository],
  exports: [SoundDataService], // Export the service so it can be used in MqttModule
})
export class SoundModule {}
