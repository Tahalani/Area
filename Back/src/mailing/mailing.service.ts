import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
    constructor(private readonly mailerService: MailerService) {}

    sendMail(to: string, text: string) : void {
        this.mailerService.sendMail({
            to: to,
            from: 'AreaEpitech@outlook.com',
            subject: 'Testing Nest MailerModule ✔',
            text: text,
            html: '<b>test</b>',
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
