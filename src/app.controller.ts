import { Controller, Get, Post, Body } from '@nestjs/common';
import { SmsStatusDto } from './sms-status.dto';
import { SmsService } from './sms.service';
import { ESmsStatus } from './sms-status.enum';

@Controller()
export class AppController {
  constructor(
    private readonly smsService: SmsService,
  ) {}

  @Post('check-sms-status')
  public async checkSmsStatus(@Body() smsStatusDto: SmsStatusDto): Promise<SmsStatusDto> {
    this.smsService.smsStatusCheck$.next(smsStatusDto);

    if (smsStatusDto.SmsStatus === ESmsStatus.DELIVERED) {
      this.smsService.smsStatusCheck$.complete();
      const subjIsStopped: boolean = this.smsService.smsStatusCheck$.isStopped;
      console.log('subjIsStopped', subjIsStopped);
      console.log('smsStatusDto', smsStatusDto);
    }

    return smsStatusDto;
  }

  @Post('send-pin')
  public async sendPinCode(@Body('phone') phone: string): Promise<any> {
    return this.smsService.sendPinCode(phone);
  }
}
