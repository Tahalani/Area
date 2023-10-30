import { Module } from '@nestjs/common';
import { LinearController } from './linear.controller';
import { LinearService } from './linear.service';

@Module({
  controllers: [LinearController],
  providers: [LinearService]
})
export class LinearModule {}
