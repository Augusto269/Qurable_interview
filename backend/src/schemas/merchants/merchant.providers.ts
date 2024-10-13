import { Connection } from 'mongoose';
import { Merchant } from './merchant.schema';

export const MerchantProviders = [
  {
    provide: 'MERCHANTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Merchant', Merchant),
    inject: ['DATABASE_CONNECTION'],
  },
];
