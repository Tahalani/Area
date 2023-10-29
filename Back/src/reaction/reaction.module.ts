import { Module, forwardRef } from '@nestjs/common';
import { ReactionArray } from './reaction.array';
import { MailingModule } from 'src/mailing/mailing.module';
import { GithubModule } from 'src/github/github.module';
import { MicrosoftModule } from 'src/microsoft/microsoft.module';
import { SpotifyModule } from 'src/spotify/spotify.module';
import { NotionModule } from 'src/notion/notion.module';
import { FigmaModule } from 'src/figma/figma.module';

@Module({
  imports: [
    MailingModule,
    forwardRef(() => GithubModule),
    forwardRef(() => MicrosoftModule),
    forwardRef(() => SpotifyModule),
    forwardRef(() => NotionModule),
    forwardRef(() => FigmaModule),
  ],
  providers: [ReactionArray],
  exports: [ReactionArray],
})
export class ReactionModule {}
