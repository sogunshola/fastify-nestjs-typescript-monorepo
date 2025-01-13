import { Module } from '@nestjs/common';
import { ListenerGateway } from '.';

@Module({
  providers: [ListenerGateway],
})
export class WebsocketModule {}
