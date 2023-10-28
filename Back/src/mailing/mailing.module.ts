import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailingReaction } from './mailing.reaction';
import { MailerService } from '@nestjs-modules/mailer';
import Mail from 'nodemailer/lib/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.outlook.com',
        auth: {
          user: 'AreaEpitech@outlook.com',
          pass: 'PSGLDC2023', // TODO ENV VARIABLE
        },
      },
    }),
  ],
  providers: [MailingReaction],
  exports: [MailingReaction],
})
export class MailingModule {}
