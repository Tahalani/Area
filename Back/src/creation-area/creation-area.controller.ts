import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreationAreaService } from './creation-area.service';
import { areaDto } from '../dto/area.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/area')
export class CreationAreaController {
  constructor(private readonly creationAreaService: CreationAreaService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createArea(@Req() req: any): Promise<string> {
    const areaDto: areaDto = req.body;
    return this.creationAreaService.createArea(areaDto, req);
  }
}
