import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SmsService } from './sms.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    SmsService,
  ],
})
export class AppModule {}
