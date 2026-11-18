import * as migration_20260704_131235_archive_orderable from './20260704_131235_archive_orderable';
import * as migration_20261118_123416_visits from './20261118_123416_visits';

export const migrations = [
  {
    up: migration_20260704_131235_archive_orderable.up,
    down: migration_20260704_131235_archive_orderable.down,
    name: '20260704_131235_archive_orderable',
  },
  {
    up: migration_20261118_123416_visits.up,
    down: migration_20261118_123416_visits.down,
    name: '20261118_123416_visits'
  },
];
