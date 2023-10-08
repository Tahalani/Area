import { Module } from '@nestjs/common';
import { CreationAreaController } from './creation-area.controller';
import { CreationAreaService } from './creation-area.service';

@Module({
    controllers: [CreationAreaController],
    providers: [CreationAreaService],
})
export class CreationAreaModule {}
