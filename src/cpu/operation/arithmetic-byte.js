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

export const INC_$HL$ = state => {
  const value = (state.mmu.read(state.register.hl) + 1) & 0xFF;

  state.mmu.write(state.register.hl, value);
  state.flag.zero = value === 0;
  state.flag.subtract = false;
  state.flag.half = (value & 0xF) === 0;
};

/* DEC
*******************************************/
const DEC_factory = regName => state => {
  state.register[regName] = (state.register[regName] - 1) & 0xFF;
  state.flag.zero = state.register[regName] === 0;
  state.flag.subtract = true;
  state.flag.half = (state.register[regName] & 0xF) === 0xF;
};

export const DEC_A = DEC_factory('a');

export const DEC_B = DEC_factory('b');

export const DEC_C = DEC_factory('c');

export const DEC_D = DEC_factory('d');

export const DEC_E = DEC_factory('e');

export const DEC_H = DEC_factory('h');

export const DEC_L = DEC_factory('l');

export const DEC_$HL$ = state => {
  const value = (state.mmu.read(state.register.hl) - 1) & 0xFF;

  state.mmu.write(state.register.hl, value);
  state.flag.zero = value === 0;
  state.flag.subtract = true;
  state.flag.half = (value & 0xF) === 0xF;
};

/* ADD
*******************************************/
const ADD_factory = regName => state => {
  const sum = state.register.a + state.register[regName];

  state.flag.carry = sum > 0xFF;
  state.flag.half = (sum & 0xF) < (state.register.a & 0xF);
  state.flag.subtract = false;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const ADD_A_A = ADD_factory('a');

export const ADD_A_B = ADD_factory('b');

export const ADD_A_C = ADD_factory('c');

export const ADD_A_D = ADD_factory('d');

export const ADD_A_E = ADD_factory('e');

export const ADD_A_H = ADD_factory('h');

export const ADD_A_L = ADD_factory('l');

export const ADD_A_$HL$ = state => {
  const input = state.mmu.read(state.register.hl);
  const sum = state.register.a + input;

  state.flag.carry = sum > 0xFF;
  state.flag.half = (sum & 0xF) < (state.register.a & 0xF);
  state.flag.subtract = false;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const ADD_A_d8 = state => {
  const input = state.mmu.read(state.register.pc + 1);
  const sum = state.register.a + input;

  state.flag.carry = sum > 0xFF;
  state.flag.half = (sum & 0xF) < (state.register.a & 0xF);
  state.flag.subtract = false;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
  state.register.pc += 1;
};

/* ADC
*******************************************/
const ADC_factory = regName => state => {
  const sum = state.register.a + state.register[regName] + (state.flag.carry ? 1 : 0);
  const halfsum = (state.register.a & 0xF) + (state.register[regName] & 0xF) + (state.flag.carry ? 1 : 0);

  state.flag.carry = sum > 0xFF;
  state.flag.half = halfsum > 0xF;
  state.flag.subtract = false;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const ADC_A_A = ADC_factory('a');

export const ADC_A_B = ADC_factory('b');

export const ADC_A_C = ADC_factory('c');

export const ADC_A_D = ADC_factory('d');

export const ADC_A_E = ADC_factory('e');

export const ADC_A_H = ADC_factory('h');

export const ADC_A_L = ADC_factory('l');

export const ADC_A_$HL$ = state => {
  const input = state.mmu.read(state.register.hl);
  const sum = state.register.a + input + (state.flag.carry ? 1 : 0);
  const halfsum = (state.register.a & 0xF) + input + (state.flag.carry ? 1 : 0);

  state.flag.carry = sum > 0xFF;
  state.flag.half = halfsum > 0xF;
  state.flag.subtract = false;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const ADC_A_d8 = state => {
  const input = state.mmu.read(state.register.pc + 1);
  const sum = state.register.a + input + (state.flag.carry ? 1 : 0);
  const halfsum = (state.register.a & 0xF) + input + (state.flag.carry ? 1 : 0);

  state.flag.carry = sum > 0xFF;
  state.flag.half = halfsum > 0xF;
  state.flag.subtract = false;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
  state.register.pc += 1;
};

/* SUB
*******************************************/
const SUB_factory = regName => state => {
  const sum = state.register.a - state.register[regName];

  state.flag.carry = sum < 0;
  state.flag.half = (state.register.a & 0xF) < (sum & 0xF);
  state.flag.subtract = true;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const SUB_A = SUB_factory('a');

export const SUB_B = SUB_factory('b');

export const SUB_C = SUB_factory('c');

export const SUB_D = SUB_factory('d');

export const SUB_E = SUB_factory('e');

export const SUB_H = SUB_factory('h');

export const SUB_L = SUB_factory('l');

export const SUB_$HL$ = state => {
  const input = state.mmu.read(state.register.hl);
  const sum = state.register.a - input;

  state.flag.carry = sum < 0;
  state.flag.half = (state.register.a & 0xF) < (sum & 0xF);
  state.flag.subtract = true;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const SUB_d8 = state => {
  const input = state.mmu.read(state.register.pc + 1);
  const sum = state.register.a - input;

  state.flag.carry = sum < 0;
  state.flag.half = (state.register.a & 0xF) < (sum & 0xF);
  state.flag.subtract = true;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
  state.register.pc += 1;
};

/* SBC
*******************************************/
const SBC_factory = regName => state => {
  const sum = state.register.a - state.register[regName] - (state.flag.carry ? 1 : 0);
  const halfsum = (state.register.a & 0xF) - (state.register[regName] & 0xF) - (state.flag.carry ? 1 : 0);

  state.flag.carry = sum < 0;
  state.flag.half = halfsum < 0;
  state.flag.subtract = true;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const SBC_A_A = SBC_factory('a');

export const SBC_A_B = SBC_factory('b');

export const SBC_A_C = SBC_factory('c');

export const SBC_A_D = SBC_factory('d');

export const SBC_A_E = SBC_factory('e');

export const SBC_A_H = SBC_factory('h');

export const SBC_A_L = SBC_factory('l');

export const SBC_A_$HL$ = state => {
  const input = state.mmu.read(state.register.hl);
  const sum = state.register.a - input - (state.flag.carry ? 1 : 0);

  state.flag.carry = sum < 0;
  state.flag.half = (state.register.a & 0xF) < (sum & 0xF);
  state.flag.subtract = true;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
};

export const SBC_A_d8 = state => {
  const input = state.mmu.read(state.register.pc + 1);
  const sum = state.register.a - input - (state.flag.carry ? 1 : 0);

  state.flag.carry = sum < 0;
  state.flag.half = (state.register.a & 0xF) < (sum & 0xF);
  state.flag.subtract = true;
  state.register.a = sum & 0xFF;
  state.flag.zero = state.register.a === 0;
  state.register.pc += 1;
};

/* AND
*******************************************/
const AND_factory = regName => state => {
  state.register.a &= state.register[regName];

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = true;
  state.flag.carry = false;
};

export const AND_A = AND_factory('a');

export const AND_B = AND_factory('b');

export const AND_C = AND_factory('c');

export const AND_D = AND_factory('d');

export const AND_E = AND_factory('e');

export const AND_H = AND_factory('h');

export const AND_L = AND_factory('l');

export const AND_$HL$ = state => {
  state.register.a &= state.mmu.read(state.register.hl);

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = true;
  state.flag.carry = false;
};

export const AND_d8 = state => {
  state.register.a &= state.mmu.read(state.register.pc + 1);

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = true;
  state.flag.carry = false;
  state.register.pc += 1;
};

/* XOR
*******************************************/
const XOR_factory = regName => state => {
  state.register.a ^= state.register[regName];

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = false;
};

export const XOR_A = XOR_factory('a');

export const XOR_B = XOR_factory('b');

export const XOR_C = XOR_factory('c');

export const XOR_D = XOR_factory('d');

export const XOR_E = XOR_factory('e');

export const XOR_H = XOR_factory('h');

export const XOR_L = XOR_factory('l');

export const XOR_$HL$ = state => {
  state.register.a ^= state.mmu.read(state.register.hl);

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = false;
};

export const XOR_d8 = state => {
  state.register.a ^= state.mmu.read(state.register.pc + 1);

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = false;
  state.register.pc += 1;
};

/* OR
*******************************************/
const OR_factory = regName => state => {
  state.register.a |= state.register[regName];

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = false;
};

export const OR_A = OR_factory('a');

export const OR_B = OR_factory('b');

export const OR_C = OR_factory('c');

export const OR_D = OR_factory('d');

export const OR_E = OR_factory('e');

export const OR_H = OR_factory('h');

export const OR_L = OR_factory('l');

export const OR_$HL$ = state => {
  state.register.a |= state.mmu.read(state.register.hl);

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = false;
};

export const OR_d8 = state => {
  state.register.a |= state.mmu.read(state.register.pc + 1);

  state.flag.zero = state.register.a === 0;
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = false;
  state.register.pc += 1;
};

/* CP
*******************************************/
const CP_factory = regName => state => {
  const sum = state.register.a - state.register[regName];

  state.flag.zero = sum === 0;
  state.flag.subtract = true;
  state.flag.half = (sum & 0xF) > (state.register.a & 0xF);
  state.flag.carry = sum < 0;
};

export const CP_A = CP_factory('a');

export const CP_B = CP_factory('b');

export const CP_C = CP_factory('c');

export const CP_D = CP_factory('d');

export const CP_E = CP_factory('e');

export const CP_H = CP_factory('h');

export const CP_L = CP_factory('l');

export const CP_$HL$ = state => {
  const sum = state.register.a - state.mmu.read(state.register.hl);

  state.flag.zero = sum === 0;
  state.flag.subtract = true;
  state.flag.half = (sum & 0xF) > (state.register.a & 0xF);
  state.flag.carry = sum < 0;
};

export const CP_d8 = state => {
  const sum = state.register.a - state.mmu.read(state.register.pc + 1);

  state.flag.zero = sum === 0;
  state.flag.subtract = true;
  state.flag.half = (sum & 0xF) > (state.register.a & 0xF);
  state.flag.carry = sum < 0;
  state.register.pc += 1;
};

/* misc
*******************************************/

// decimal adjust accumulator (BCD)
export const DAA = state => {
  if (state.flag.subtract) {
    if (state.flag.carry && state.flag.half) {
      state.register.a = (state.register.a + 0x9A) & 0xFF;
      state.flag.half = false;
    } else if (state.flag.carry) {
      state.register.a = (state.register.a + 0xA0) & 0xFF;
    } else if (state.flag.half) {
      state.register.a = (state.register.a + 0xFA) & 0xFF;
      state.flag.half = false;
    }
  } else {
    if (state.flag.carry || state.register.a > 0x99) {
      state.register.a = (state.register.a + 0x60) & 0xFF;
      state.flag.carry = true;
    }
    if (state.flag.half || (state.register.a & 0xF) > 0x9) {
      state.register.a = (state.register.a + 0x06) & 0xFF;
      state.flag.half = false;
    }
  }

  state.flag.zero = state.register.a === 0;
};

// complement value of A
export const CPL = state => {
  state.register.a ^= 0xFF;
  state.flag.subtract = true;
  state.flag.half = true;
};

// set carry flag
export const SCF = state => {
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = true;
};

// complement carry flag
export const CCF = state => {
  state.flag.subtract = false;
  state.flag.half = false;
  state.flag.carry = !state.flag.carry;
};
