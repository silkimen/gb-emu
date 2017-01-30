/* eslint-disable camelcase */

/* INC
*******************************************/
export const INC_BC = state => {
  const val = (state.register.b << 8) + state.register.c + 1;

  state.register.b = (val & 0xFF) >> 8;
  state.register.c = val & 0xFF;
};

export const INC_DE = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const INC_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const INC_SP = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* DEC
*******************************************/
export const DEC_BC = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_DE = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DEC_SP = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* ADD
*******************************************/
export const ADD_HL_BC = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_HL_DE = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_HL_HL = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_HL_SP = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const ADD_SP_r8 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};
