import { Injectable } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { ActionEntity } from 'src/entity/action.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { UserEntity } from 'src/entity/user.entity';
import { AreaEntity } from 'src/entity/area.entity';

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

    async getAreas(email: string) {
        const user = await UserEntity.findOneBy({
            email: email
        });

        if (user === undefined || user === null)
            return "No user";

        const areas = await AreaEntity.find({
            where: {
                user: { id: user.id }
            }
        });

        if (areas.length === 0) {
            console.log("pas dareas");
            return "No areas";
        }

        return areas;
    }

    async getUserServices(email: string) {
        const user = await UserEntity.findOneBy({
            email: email
        });

        if (user === undefined || user === null)
            return "No user";

        const userServices = await UserServiceEntity.find({
            where: {
                user: { id: user.id }
            }
        });

        if (userServices.length === 0)
            return "No user services";

        const services = await ServiceEntity.find();

        if (services.length === 0)
            return "No services";

        const servicesArray: string[] = [];

        for (let i = 0; i < services.length; i++) {
            for (let j = 0; j < userServices.length; j++) {
                if (services[i].id === userServices[j].serviceId) {
                    servicesArray.push(services[i].name);
                }
            }
        }

        return servicesArray;
    }
}
