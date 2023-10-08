import { OnModuleInit } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import { ActionEntity } from 'src/entity/action.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { promises as fsPromises } from 'fs';


export class InitService implements OnModuleInit {
  
  async onModuleInit() {
    async function createService(serviceInfo: any) {
      try {
        const existingService = await ServiceEntity.findOne({ where: { name: serviceInfo.name.toLowerCase() } });
        if (existingService) return;
        
        const serviceEntity = ServiceEntity.create();
        serviceEntity.name = serviceInfo.name.toLowerCase();
        serviceEntity.description = serviceInfo.description;
        serviceEntity.logo_url = serviceInfo.logo_url;
        await serviceEntity.save();
        console.log(`Service ${serviceInfo.name} créé avec succès.`);
      } catch (error) {
        console.log(`Erreur lors de la création du service ${serviceInfo.name}:`, error.message);
      }
    }

    try {
      const jsonData = await fsPromises.readFile('./about.json', 'utf-8');
      const config = JSON.parse(jsonData);
      for (const serviceInfo of config.server.services) {
        await createService(serviceInfo);
      }
    } catch (error) {
      console.error('Erreur lors de la lecture de about.json :', error);
    }

      try {
        const reactionMail: ReactionEntity = ReactionEntity.create();
        reactionMail.id = 1;
        reactionMail.description = 'mail';
        reactionMail.nbr_args = 2;
        reactionMail.service = await ServiceEntity.findOneOrFail({ where: { name: 'mail' } });
        await reactionMail.save();
      } catch (error) {
          console.log("Error reaction 1 already exist");
      }

    try {
      const actionPush: ActionEntity = ActionEntity.create();
      actionPush.id = 1;
      actionPush.description = 'github push';
      actionPush.nbr_args = 1;
      actionPush.service = await ServiceEntity.findOneOrFail({ where: { name: 'github' } });
      await actionPush.save();
    } catch (error) {
      console.log("error action 1 already exist");
    }
  }
}
