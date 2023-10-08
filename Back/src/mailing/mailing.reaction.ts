import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class MailingReaction {
    constructor(private readonly mailerService: MailerService) {}

    sendMail(userService: UserServiceEntity, arg: any) : void {
        this.mailerService.sendMail({
            to: arg.to,
            from: 'AreaEpitech@outlook.com',
            subject: 'Testing Nest MailerModule ✔',
            text: arg.text,
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
