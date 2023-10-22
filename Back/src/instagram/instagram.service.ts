import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramService {
    addService(req: any) {
        console.log("addService");
    }
}
