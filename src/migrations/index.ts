import * as migration_20260601_111256 from './20260601_111256';

export const migrations = [
  {
    up: migration_20260601_111256.up,
    down: migration_20260601_111256.down,
    name: '20260601_111256'
  },
];
