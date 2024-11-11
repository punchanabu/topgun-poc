import { Module } from '@nestjs/common';
import { SoundService } from './sound.service';

@Module({
  providers: [SoundService],
  exports: [SoundService],
})
export class SoundModule {}
