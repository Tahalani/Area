import { Module } from '@nestjs/common';
import { FrontDataService } from './front-data.service';
import { FrontDataController } from './front-data.controller';

@Module({
  providers: [FrontDataService],
  controllers: [FrontDataController]
})
export class FrontDataModule {}
