/* eslint-disable camelcase */

/* INC
*******************************************/
const INC_factory = regName => state => {
  state.register[regName] = (state.register[regName] + 1) & 0xFF;
  state.flag.zero = state.register[regName] === 0;
  state.flag.subtract = false;
  state.flag.half = (state.register[regName] & 0xF) === 0;
};

export const INC_A = INC_factory('a');

export const INC_B = INC_factory('b');

export const INC_C = INC_factory('c');

export const INC_D = INC_factory('d');

export const INC_E = INC_factory('e');

export const INC_H = INC_factory('h');

export const INC_L = INC_factory('l');

export const INC_$HL = state => {
  const address = (state.register.h << 8) + state.register.l;
  const value = (state.mmu.read(address) + 1) & 0xFF;

  state.mmu.write(address, value);
  state.flag.zero = value === 0;
  state.flag.subtract = false;
  state.flag.half = (value & 0xF) === 0;
};

/* DEC
*******************************************/
export const DEC_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_B = state => {
  state.register.b = (state.register.b - 1) & 0xFF;
  state.flag.zero = state.register.b === 0;
  state.flag.subtract = true;
  state.flag.half = (state.register.b & 0xF) === 0xF;
};

export const DEC_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* ADD
*******************************************/
export const ADD_A_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_A_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* ADC
*******************************************/
export const ADC_A_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADC_A_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* SUB
*******************************************/
export const SUB_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SUB_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* SBC
*******************************************/
export const SBC_A_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SBC_A_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* AND
*******************************************/
export const AND_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const AND_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* XOR
*******************************************/
export const XOR_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const XOR_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* OR
*******************************************/
export const OR_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const OR_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* CP
*******************************************/
export const CP_A = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_B = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_C = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_D = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_E = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_H = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_L = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CP_d8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* misc
*******************************************/
export const DAA = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CPL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const SCF = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CCF = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};
