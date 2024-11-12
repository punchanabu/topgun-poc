import { Injectable } from '@nestjs/common';
import { SoundDataRepository } from './sound.repository';
import { SoundData } from '../model/sound.model';

@Injectable()
export class SoundDataService {
  constructor(private readonly soundDataRepository: SoundDataRepository) {}

  async saveSoundData(soundData: SoundData) {
    try {
      return await this.soundDataRepository.create(soundData);
    } catch (error) {
      console.error('Error saving sound data:', error);
      throw error;
    }
  }
}
