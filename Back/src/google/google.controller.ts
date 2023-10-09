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
import { config } from 'dotenv';

config();

@Controller('api/auth')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

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
      `http://${process.env.DNS_NAME}:8081/auth/succes?token=${userToken.access_token}`,
    );
    return;
  }
}
