import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreationAreaService } from './creation-area.service';
import { areaDto } from '../dto/area.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiNotImplementedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('api/area')
export class CreationAreaController {
  constructor(private readonly creationAreaService: CreationAreaService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create area' })
  @ApiNotFoundResponse({ description: 'user not found'})
  @ApiNotImplementedResponse({ description: 'Action or Reaction not Found'})
  @ApiNotAcceptableResponse({description: 'User not connected to service'})
  @Post('create')
  createArea(@Req() req: any): Promise<string> {
    const areaDto: areaDto = req.body;
    return this.creationAreaService.createArea(areaDto, req);
  }
}
