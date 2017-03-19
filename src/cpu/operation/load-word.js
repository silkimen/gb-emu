/* eslint-disable camelcase */

/* LD
*******************************************/
export const LD_BC_d16 = state => {
  state.register.c = state.mmu.read(state.register.pc + 1);
  state.register.b = state.mmu.read(state.register.pc + 2);
  state.register.pc += 2;
};

export const LD_DE_d16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const LD_HL_d16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const LD_HL_SPpr8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const LD_SP_d16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const LD_SP_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const LD_a16_SP = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* PUSH
*******************************************/
export const PUSH_AF = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const PUSH_BC = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const PUSH_DE = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const PUSH_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* POP
*******************************************/
export const POP_AF = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const POP_BC = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const POP_DE = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const POP_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};
