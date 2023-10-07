import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { Response } from 'express';
import { GitHubService } from './github.service';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth/auth.guard';
import { OnModuleInit } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

config();

@Controller('api')
// mettre un guard
export class GitHubController implements OnModuleInit {
  constructor(private readonly gitHubService: GitHubService) {}

  async onModuleInit() {
    const service: ServiceEntity = ServiceEntity.create();
    service.name = 'github';
    service.description = 'github service';
    service.logo_url =
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
    try {
      await service.save();
    } catch (error) {
      console.log(service.name + ' service already exists');
    }
  }

  @ApiOkResponse({
    description: 'Endpoint to redirect to github authentification',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('auth/GitHub')
  async GitHubAuth(@Req() req: any, @Res() res: Response) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.gitHubRedirectURL}&scope=repo,read:user,read:org&state=${req.user.email}`,
    );
  }

  @ApiExcludeEndpoint()
  @Get('auth/GitHub/callback')
  async GitHubAuthCallback(@Req() req: Request, @Res() res: Response) {
    this.gitHubService.addService(req);
    res.redirect(`http://localhost:8081/AreaPage`);
  }

  @ApiExcludeEndpoint()
  @Post('Webhook/GitHub')
  // mettre un guardd
  async GitHubWebhook(@Req() req: any, @Res() res: Response) {
    console.log('JE RECOIS WEBHOOK: ', req);
    res.send(req.user);
  }
}
