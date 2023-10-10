import { Controller, Get, Query } from '@nestjs/common';
import { FrontDataService } from './front-data.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('api')
export class FrontDataController {

    constructor(private readonly frontDataService: FrontDataService) {}

    @ApiOkResponse({ description: 'Return all services' })
    @Get('services/get')
    async handleServices() {
        return this.frontDataService.getServices();
    }

    @ApiOkResponse({ description: 'Return action of the service' })
    @Get('actions/get')
    async handleActions(@Query('serviceId') serviceId: number) {
        console.log(serviceId);
        return this.frontDataService.getActions(serviceId);
    }

    @ApiOkResponse({ description: 'Return all reactions' })
    @Get('reactions/get')
    async handleReactions() {
        return this.frontDataService.getReactions();
    }
}
