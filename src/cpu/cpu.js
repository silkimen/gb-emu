/**
 * Gameboy CPU (Sharp LR35902)
 */

import { cbMap } from './cb-map';
import { instructionMap } from './instruction-map';
import { flag, register, reset } from './register';
import * as mmu from './mmu';

const state = { register, flag, mmu };
