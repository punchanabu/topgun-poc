import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoundData } from '../model/sound.model';

@Injectable()
export class SoundDataRepository {
  constructor(
    @InjectModel(SoundData.name)
    private readonly soundDataModel: Model<SoundData>,
  ) {}

  async create(soundData: SoundData): Promise<SoundData> {
    const newSoundData = new this.soundDataModel(soundData);
    return await newSoundData.save();
  }
}
