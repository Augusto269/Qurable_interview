import { Connection } from 'mongoose';
import { SettingsDiscount } from './settings.schema';

export const SettingsDiscountProviders = [
  {
    provide: 'SETTINGS_DISCOUNTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('SettingsDiscounts', SettingsDiscount),
    inject: ['DATABASE_CONNECTION'],
  },
];
