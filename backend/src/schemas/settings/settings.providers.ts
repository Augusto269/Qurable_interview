import { Connection } from 'mongoose';
import { SettingsDiscount } from './settings.schema';

export const merchantProviders = [
  {
    provide: 'MERCHANTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('SettingsDiscounts', SettingsDiscount),
    inject: ['DATABASE_CONNECTION'],
  },
];
