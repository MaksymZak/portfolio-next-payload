import * as migration_20260704_131235_archive_orderable from './20260704_131235_archive_orderable';

export const migrations = [
  {
    up: migration_20260704_131235_archive_orderable.up,
    down: migration_20260704_131235_archive_orderable.down,
    name: '20260704_131235_archive_orderable'
  },
];
