import { Controller, Post, Req } from '@nestjs/common';
import { CreationAreaService } from './creation-area.service';
import { areaDto } from '../dto/area.dto';

@Controller('api/area')
export class CreationAreaController {
    constructor(private readonly creationAreaService: CreationAreaService) {}

    @Post('create')
    createArea(@Req() req: any) : Promise<string> {
        const areaDto: areaDto = req.body;
        return this.creationAreaService.createArea(areaDto);
    }
}
