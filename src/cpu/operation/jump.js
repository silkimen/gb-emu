/* eslint-disable camelcase */

/* JR
*******************************************/
export const JR_r8 = state => {
  const signed = (state.mmu.read(++state.register.pc) << 24) >> 24;

  state.register.pc += signed;
};

export const JR_NZ_r8 = state => {
  const signed = (state.mmu.read(++state.register.pc) << 24) >> 24;

  if (!state.flag.zero) {
    state.register.pc += signed;
  }
};

export const JR_Z_r8 = state => {
  const signed = (state.mmu.read(++state.register.pc) << 24) >> 24;

  if (state.flag.zero) {
    state.register.pc += signed;
  }
};

export const JR_NC_r8 = state => {
  const signed = (state.mmu.read(++state.register.pc) << 24) >> 24;

  if (!state.flag.carry) {
    state.register.pc += signed;
  }
};

export const JR_C_r8 = state => {
  const signed = (state.mmu.read(++state.register.pc) << 24) >> 24;

  if (state.flag.carry) {
    state.register.pc += signed;
  }
};

/* RET
*******************************************/
export const RET = state => {
  state.register.pc = (state.mmu.read(state.register.sp + 1 & 0xFFFF) << 8) + state.mmu.read(state.register.sp);
  state.register.sp += 2;
};

export const RET_NZ = state => {
  if (!state.flag.zero) {
    state.register.pc = (state.mmu.read(state.register.sp + 1 & 0xFFFF) << 8) + state.mmu.read(state.register.sp);
    state.register.sp += 2;
  }
};

export const RET_Z = state => {
  if (state.flag.zero) {
    state.register.pc = (state.mmu.read(state.register.sp + 1 & 0xFFFF) << 8) + state.mmu.read(state.register.sp);
    state.register.sp += 2;
  }
};

export const RET_NC = state => {
  if (!state.flag.carry) {
    state.register.pc = (state.mmu.read(state.register.sp + 1 & 0xFFFF) << 8) + state.mmu.read(state.register.sp);
    state.register.sp += 2;
  }
};

export const RET_C = state => {
  if (state.flag.carry) {
    state.register.pc = (state.mmu.read(state.register.sp + 1 & 0xFFFF) << 8) + state.mmu.read(state.register.sp);
    state.register.sp += 2;
  }
};

/* RETI
*******************************************/
export const RETI = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* JP
*******************************************/
export const JP_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const JP_NZ_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const JP_Z_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const JP_NC_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const JP_C_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const JP_$HL$ = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* CALL
*******************************************/
export const CALL_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CALL_NZ_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CALL_Z_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CALL_NC_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const CALL_C_a16 = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

/* RST
*******************************************/
export const RST_00h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RST_08h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RST_10h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RST_18h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RST_20h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RST_28h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RST_30h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RST_38h = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};
