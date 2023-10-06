import { Controller, Get, Query } from '@nestjs/common';
import { MailingService } from './mailing.service';

export class MailQuery {
    to: string;
    text: string
}

@Controller('mailing')
export class MailingController {
    constructor(private readonly mailingService: MailingService) {}

    @Get()
    sendMail(@Query() query: MailQuery) {
        if (!query.to || !query.text)
            return "No mail provided";
        this.mailingService.sendMail(query.to, query.text);
    }
}
