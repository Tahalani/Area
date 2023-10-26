import { Module } from '@nestjs/common';
import { ActionArray } from './action.array';
import { MailingModule } from 'src/mailing/mailing.module';
import { GithubModule } from 'src/github/github.module';
import { MicrosoftModule } from 'src/microsoft/microsoft.module';

@Module({
  imports: [MailingModule, GithubModule, MicrosoftModule],
  providers: [ActionArray],
  exports: [ActionArray],
})
export class ActionModule {}
