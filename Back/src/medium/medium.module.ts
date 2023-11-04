import { Module } from '@nestjs/common';
import { MediumController } from './medium.controller';
import { ReactionMedium } from './reactionMedium';
import { MediumService } from './medium.service';

@Module({
  providers: [ReactionMedium, MediumService],
  controllers: [MediumController]
})
export class MediumModule {}
