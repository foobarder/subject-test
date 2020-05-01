import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { SmsStatusDto } from './sms-status.dto';

@Injectable()
export class SmsService {
    private _smsStatusCheck$: Subject<any>;

    public get smsStatusCheck$(): Subject<any> {
        return this._smsStatusCheck$;
    }

    public async sendPinCode(phone: string): Promise<any> {
        const generatedPinCode: string = '123456';
        this._smsStatusCheck$ = new Subject<any>();

        console.log(`Sending PIN: ${generatedPinCode} to PHONE_NUMBER: ${phone}`);

        this.smsStatusCheck$.subscribe(
            (smsStatus: SmsStatusDto) => console.log('smsStatus', smsStatus),
            err => err,
            () => console.log('Compliting...'),
        );
    }
}
