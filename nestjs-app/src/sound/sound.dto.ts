import { IsDate, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class SoundDataDto {
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  @IsObject()
  data: number;
}
