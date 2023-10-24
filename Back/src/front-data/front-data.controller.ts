import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { FrontDataService } from './front-data.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

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
        return this.frontDataService.getActions(serviceId);
    }

    @ApiOkResponse({ description: 'Return all reactions' })
    @Get('reactions/get')
    async handleReactions() {
        return this.frontDataService.getReactions();
    }

    @ApiOkResponse({ description: 'Return all user services' })
    @UseGuards(AuthGuard)
    @Get('user/services/get')
    async handleUserServices(@Req () req: any) {
        return this.frontDataService.getUserServices(req.user.email);
    }

    @ApiOkResponse({ description: 'Return action of the service' })
    @UseGuards(AuthGuard)
    @Get('areas/get')
    async handleAreas(@Req () req: any) {
        return this.frontDataService.getAreas(req.user.email);
    }
}
