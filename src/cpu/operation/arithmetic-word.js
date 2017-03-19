/* eslint-disable camelcase */

/* INC
*******************************************/
export const INC_BC = state => {
  const val = (state.register.b << 8) + state.register.c + 1;

  state.register.b = (val >> 8) & 0xFF;
  state.register.c = val & 0xFF;
};

export const INC_DE = state => {
  const val = (state.register.d << 8) + state.register.e + 1;

  state.register.d = (val >> 8) & 0xFF;
  state.register.e = val & 0xFF;
};

export const INC_HL = state => {
  const val = (state.register.h << 8) + state.register.l + 1;

  state.register.h = (val >> 8) & 0xFF;
  state.register.l = val & 0xFF;
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
