import { Controller, Get, Query } from '@nestjs/common';
import { FrontDataService } from './front-data.service';

@Controller('api')
export class FrontDataController {

    constructor(private readonly frontDataService: FrontDataService) {}

    @Get('services/get')
    async handleServices() {
        return this.frontDataService.getServices();
    }

    @Get('actions/get')
    async handleActions(@Query('serviceId') serviceId: number) {
        console.log(serviceId);
        return this.frontDataService.getActions(serviceId);
    }

    @Get('reactions/get')
    async handleReactions() {
        return this.frontDataService.getReactions();
    }
}
