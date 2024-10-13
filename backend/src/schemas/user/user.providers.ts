import { Connection } from 'mongoose';
import { User } from './user.schema';

export const MerchantProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', User),
    inject: ['DATABASE_CONNECTION'],
  },
];
