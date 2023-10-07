import { Injectable } from '@nestjs/common';
import { areaDto } from '../dto/area.dto';
import { decode } from 'jsonwebtoken';
import { UserEntity } from '../entity/user.entity';
import { ActionEntity } from '../entity/action.entity';
import { AreaEntity } from 'src/entity/area.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';

@Injectable()
export class CreationAreaService {

    async getUser(token: string) : Promise<UserEntity | null> {
        const userData: any = decode(token);
        const user = await UserEntity.findOneBy({ email: userData.email });
        return user;
    }

    async getAction(actionId: number) : Promise<ActionEntity | null> {
        console.log("actionId: ", actionId);
        const action = await ActionEntity.findOneBy({ id: actionId }).catch((err) => {
            console.log("error: ", err);
            return null;
        });
        return action;
    }

    async getReaction(reactionId: number) : Promise<ReactionEntity | null> {
        const reaction = await ReactionEntity.findOneBy({ id: reactionId });
        return reaction;
    }

    async createArea(areaData: areaDto) : Promise<string>{
        // TODO check auth of the client et qu'il soit connecté au services

        const user: UserEntity | null  = await this.getUser(areaData.token);
        if (user === null)
            return "42 User not found";

        const action: ActionEntity | null = await this.getAction(areaData.id_Action);
        if (action === null)
            return "410 Action not found";

        const reaction: ReactionEntity | null = await this.getReaction(areaData.id_Reaction);
        if (reaction === null)
            return "854 Reaction not found";

        if (areaData.argsAction === null || areaData.argsReaction === null)
            return "854 argsAction or argsReaction is null";

        try {
          const area: AreaEntity = AreaEntity.create();
          area.user = user;
          area.action = action;
          area.reaction = reaction;
          area.args_action = areaData.argsAction;
          area.args_reaction = areaData.argsReaction;
          await AreaEntity.save(area);

          return 'This action adds a new area';
        } catch (error) {
          console.log("error saving area: ", error);
          return "Error saving area";
        }
    }
}
