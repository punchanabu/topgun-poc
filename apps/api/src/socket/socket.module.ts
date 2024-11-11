import { Module } from '@nestjs/common';
import { SoundGateway } from './socket.service';

@Module({
  providers: [SoundGateway],
})
export class WebsocketModule {}
