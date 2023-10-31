import { Module, forwardRef} from '@nestjs/common';
import { GoogleController } from './google.controller';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleService } from './google.service';
import { ReactionModule } from 'src/reaction/reaction.module';
import { ReactionGoogle } from './reactionGoogle';

@Module({
    imports: [AuthModule, forwardRef(() => ReactionModule)],
    controllers: [GoogleController],
    providers: [GoogleService, ReactionGoogle],
    exports: [ReactionGoogle]
})
export class GoogleModule {}
