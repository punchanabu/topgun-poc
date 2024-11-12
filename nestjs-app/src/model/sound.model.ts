import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SoundData extends Document {
  @Prop({ required: true })
  timestamp: Date;
  @Prop({ required: true })
  data: string;
}

export const SoundDataSchema = SchemaFactory.createForClass(SoundData);
