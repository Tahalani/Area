import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SlackService } from './slack.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { config } from 'dotenv';
import { ApiExcludeEndpoint, ApiBearerAuth } from '@nestjs/swagger';

config();

@Controller('api')
export class SlackController {
    constructor(private readonly slackService: SlackService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('auth/slack')
    async slackAuth(@Req() req: any, @Res() res: Response) {
        console.log("slackAuth");
        const client_id= process.env.SLACK_CLIENT_ID
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/slack/callback`
        const response_type = 'code'
        const scope = "users:read users:read.email"

        res.redirect('https://slack.com/oauth/v2/authorize' +
        '?response_type='+ response_type + '&client_id=' + client_id +
        '&redirect_uri=' + redirect_uri + '&scope=' + scope + '&state=' + req.user.email)
    }

    @ApiExcludeEndpoint()
    @Get('auth/slack/callback')
    async slackAuthCallback(@Req() req: any, @Res() res: Response) {
        this.slackService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
