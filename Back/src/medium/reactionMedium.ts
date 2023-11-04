import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';
import { config } from 'dotenv';

config();

@Injectable()
export class ReactionMedium {}
