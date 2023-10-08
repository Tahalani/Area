import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailingReaction } from './mailing/mailing.reaction';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { GithubModule } from './github/github.module';
import * as dotenv from 'dotenv';
import { MicrosoftService } from './microsoft/microsoft.service';
import { MicrosoftController } from './microsoft/microsoft.controller';
import { SmeeModule } from './smee/smee.module';
import { InitService } from './initialization/initiService';
import { CreationAreaModule } from './creation-area/creation-area.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'postgres',
      password: 'helloworld', // TODO ENV VARIABLE
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport : {
        host: 'smtp.outlook.com',
        auth: {
          user: "AreaEpitech@outlook.com",
          pass: "PSGLDC2023" // TODO ENV VARIABLE
        }
      }}),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    GoogleModule,
    GithubModule,
    SmeeModule,
    CreationAreaModule,
  ],
  controllers: [AppController, MicrosoftController],
  providers: [AppService, MailingReaction, MicrosoftService, InitService],
})
export class AppModule {}
