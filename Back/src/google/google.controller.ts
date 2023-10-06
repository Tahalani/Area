import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  OnModuleInit,
} from '@nestjs/common';
import { GoogleService } from './google.service';
import { ServiceEntity } from 'src/entity/service.entity';
import { GoogleGuard } from './google.guard';
import { Response } from 'express';
import { ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';

@Controller('api/auth')
export class GoogleController implements OnModuleInit {
  constructor(private readonly googleService: GoogleService) {}

  async onModuleInit() {
    const service: ServiceEntity = ServiceEntity.create();
    service.name = 'google';
    service.description = 'google authentification';
    service.logo_url =
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
    try {
      await service.save();
    } catch (error) {
      console.log(service.name + ' service already exists');
    }
  }

  @ApiOkResponse({
    description: 'Endpoint to redirect to google authentification',
  })
  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req: any) {}

  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const userToken = await this.googleService.registerGoogleUser(req.user);
    await this.googleService.saveToken(req);
    res.redirect(
      `http://163.172.134.80:8081/auth/succes?token=${userToken.access_token}`,
    );
    return;
  }
}
