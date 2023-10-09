import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { google } from 'googleapis';
import { config } from 'dotenv';

config();

@Injectable()
export class GoogleGuard implements CanActivate {
  oauth2 = new google.auth.OAuth2(
    '807256344858-vibjvo13976sh2nrf1mg4g7rbqhn5jjn.apps.googleusercontent.com',
    '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',
    `${process.env.DNS_NAME}:8080/api/auth/google/callback`,
  );

  url = this.oauth2.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.query.code === undefined) {
      response.redirect(this.url);
      return false;
    }
    const code = request.query.code;

    const { tokens } = await this.oauth2.getToken(code);
    if (tokens.access_token === undefined || tokens.access_token === null) {
      throw new UnauthorizedException();
    }
    request['tokens'] = tokens;

    this.oauth2.setCredentials(tokens);
    const auth = google.oauth2({ auth: this.oauth2, version: 'v2' });

    const res = await auth.userinfo.get();

    console.log(res.data);
    request['user'] = res.data;
    return true;
  }
}
