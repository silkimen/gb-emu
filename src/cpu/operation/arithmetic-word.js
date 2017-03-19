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
