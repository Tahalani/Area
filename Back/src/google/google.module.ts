import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleService } from './google.service';

@Module({
    imports: [AuthModule],
    controllers: [GoogleController],
    providers: [GoogleService],
})
export class GoogleModule {}
