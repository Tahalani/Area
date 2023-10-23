import { Module } from '@nestjs/common';
import { MicrosoftController } from './microsoft.controller';
import { MicrosoftService } from './microsoft.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReactionMicrosoft } from './reactionMicrosoft';
import { ActionMicrosoft } from './actionMicrosoft';

@Module({
  imports: [AuthModule],
  controllers: [MicrosoftController],
  providers: [MicrosoftService, ReactionMicrosoft, ActionMicrosoft],
})
export class MicrosoftModule {}
