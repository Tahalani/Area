import { Module } from '@nestjs/common';
import { OutlookController } from './outlook.controller';
import { OutlookService } from './outlook.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReactionOutlook } from './reactionOutlook';
import { ActionOutlook } from './actionOutlook';

@Module({
  imports: [AuthModule],
  controllers: [OutlookController],
  providers: [OutlookService, ReactionOutlook, ActionOutlook],
})
export class OutlookModule {}
