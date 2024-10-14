import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor() {}
  async sendMail(body: any): Promise<boolean> {
    //TB implement any gateway logic here
    return true;
  }
}
