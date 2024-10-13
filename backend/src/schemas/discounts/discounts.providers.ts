import { Connection } from 'mongoose';
import { Discounts } from './discounts.schema';

export const DiscountsProviders = [
  {
    provide: 'DISCOUNTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Discounts', Discounts),
    inject: ['DATABASE_CONNECTION'],
  },
];
