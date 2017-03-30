/* eslint-disable camelcase */

/* INC
*******************************************/
export const INC_BC = state => {
  state.register.bc += 1;
};

export const INC_DE = state => {
  state.register.de += 1;
};

export const INC_HL = state => {
  state.register.hl += 1;
};

export const INC_SP = state => {
  state.register.sp += 1;
};

/* DEC
*******************************************/
export const DEC_BC = state => {
  state.register.bc -= 1;
};

export const DEC_DE = state => {
  state.register.de -= 1;
};

export const DEC_HL = state => {
  state.register.hl -= 1;
};

export const DEC_SP = state => {
  state.register.sp -= 1;
};

/* ADD
*******************************************/
const ADD_HL_factory = regName => state => {
  const sum = state.register.hl + state.register[regName];

  state.flag.carry = sum > 0xFFFF;
  state.flag.half = (sum & 0xFFF) < (state.register.hl & 0xFFF);
  state.flag.subtract = false;
  state.register.hl = sum & 0xFFFF;
};

export const ADD_HL_BC = ADD_HL_factory('bc');

export const ADD_HL_DE = ADD_HL_factory('de');

export const ADD_HL_HL = ADD_HL_factory('hl');

export const ADD_HL_SP = ADD_HL_factory('sp');

export const ADD_SP_r8 = state => {
  const signedVal = (state.mmu.read(++state.register.pc) << 24) >> 24;
  const sum = (state.register.sp + signedVal) & 0xFFFF;
  const carryCheck = state.register.sp ^ signedVal ^ sum;

  state.register.sp = sum;

  state.flag.zero = false;
  state.flag.half = (carryCheck & 0x10) === 0x10;
  state.flag.subtract = false;
  state.flag.carry = (carryCheck & 0x100) === 0x100;
};
