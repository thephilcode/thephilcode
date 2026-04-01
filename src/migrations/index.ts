import * as migration_20260401_065048 from './20260401_065048';
import * as migration_20260401_132812 from './20260401_132812';

export const migrations = [
  {
    up: migration_20260401_065048.up,
    down: migration_20260401_065048.down,
    name: '20260401_065048',
  },
  {
    up: migration_20260401_132812.up,
    down: migration_20260401_132812.down,
    name: '20260401_132812'
  },
];
