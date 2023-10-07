import { OnModuleInit } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import { ActionEntity } from 'src/entity/action.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';

export class InitService implements OnModuleInit {
    async onModuleInit() {
      try {
        const serviceGoogle: ServiceEntity = ServiceEntity.create();
        serviceGoogle.name = 'google';
        serviceGoogle.description = 'google authentification';
        serviceGoogle.logo_url =
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
        await serviceGoogle.save();
      } catch (error) {
        console.log("error service google: ", error);
      }

      try {
        const serviceGithub: ServiceEntity = ServiceEntity.create();
        serviceGithub.name = 'github';
        serviceGithub.description = 'github service';
        serviceGithub.logo_url =
        'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
          await serviceGithub.save();
          }
      catch (error) {
          console.log("error: service github: ", error);
      }

      try {
        const serviceMail: ServiceEntity = ServiceEntity.create();
        serviceMail.name = 'mail';
        serviceMail.description = 'mail service';
        serviceMail.logo_url =
        'https://icon-library.com/images/mail-icon-png-white/mail-icon-png-white-18.jpg';
        await serviceMail.save();
      }
      catch (error) {
        console.log("error service mail: ", error);
      }

      try {
        const reactionMail: ReactionEntity = ReactionEntity.create();
        reactionMail.id = 1;
        reactionMail.description = 'mail';
        reactionMail.nbr_args = 2;
        reactionMail.service = await ServiceEntity.findOneOrFail({ where: { name: 'mail' } });
        await reactionMail.save();
      } catch (error) {
          console.log("error reaction mail: ", error);
      }

    try {
      const actionPush: ActionEntity = ActionEntity.create();
      actionPush.id = 1;
      actionPush.description = 'github push';
      actionPush.nbr_args = 1;
      actionPush.service = await ServiceEntity.findOneOrFail({ where: { name: 'github' } });
      await actionPush.save();
    } catch (error) {
      console.log("error action push: ", error);
    }
  }
}
