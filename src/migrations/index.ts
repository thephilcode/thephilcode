import * as migration_20260401_065048 from './20260401_065048';

export const migrations = [
  {
    up: migration_20260401_065048.up,
    down: migration_20260401_065048.down,
    name: '20260401_065048'
  },
];
