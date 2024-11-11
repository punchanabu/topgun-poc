import { Module } from '@nestjs/common';
import { WebsocketModule } from 'src/socket/socket.module';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [MqttModule, WebsocketModule],
})
export class SoundModule {}
