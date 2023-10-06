import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailingController } from './mailing/mailing.controller';
import { MailingService } from './mailing/mailing.service';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { GithubModule } from './github/github.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'postgres',
      password: 'helloworld',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport : {
        host: 'smtp.outlook.com',
        auth: {
          user: "AreaEpitech@outlook.com",
          pass: "PSGLDC2023"
        }
      }}),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    GoogleModule,
    GithubModule
  ],
  controllers: [AppController, MailingController],
  providers: [AppService, MailingService],
})
export class AppModule {}
