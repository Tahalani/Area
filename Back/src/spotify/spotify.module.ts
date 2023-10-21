import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { AuthModule } from 'src/auth/auth.module';
// import { GithubModule } from 'src/github/github.module';

@Module({
  imports: [AuthModule],
  controllers: [SpotifyController],
  providers: [SpotifyService]
})
export class SpotifyModule {}
