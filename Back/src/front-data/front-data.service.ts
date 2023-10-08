import { Injectable } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { ActionEntity } from 'src/entity/action.entity';

@Injectable()
export class FrontDataService {

    async getServices() {
        const services = await ServiceEntity.find();
        if (services.length === 0)
            return "No services";
        return services;
    }

    async getActions(serviceId: number) {
        const actions = await ActionEntity.find({
            where : {
                service: { id : serviceId}
            }
        });
        if (actions.length === 0)
            return "No actions";
        return actions;
    }

    async getReactions() {
        const reactions = await ReactionEntity.find();
        if (reactions.length === 0)
            return "No reactions";
        return reactions;
    }
}
