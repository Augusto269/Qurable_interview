import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  constructor() {}
  async createCharge(body: any): Promise<boolean> {
    //TB implement any gateway logic here
    return true;
  }
}
