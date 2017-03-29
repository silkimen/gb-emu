/* eslint-disable camelcase */

/* LD
*******************************************/
export const LD_BC_d16 = state => {
  state.register.c = state.mmu.read(state.register.pc + 1);
  state.register.b = state.mmu.read(state.register.pc + 2);
  state.register.pc += 2;
};

export const LD_DE_d16 = state => {
  state.register.e = state.mmu.read(state.register.pc + 1);
  state.register.d = state.mmu.read(state.register.pc + 2);
  state.register.pc += 2;
};

export const LD_HL_d16 = state => {
  state.register.l = state.mmu.read(state.register.pc + 1);
  state.register.h = state.mmu.read(state.register.pc + 2);
  state.register.pc += 2;
};

export const LD_SP_d16 = state => {
  const higher = state.mmu.read(state.register.pc + 2) << 8;
  const lower = state.mmu.read(state.register.pc + 1);

  state.register.sp = higher + lower;
  state.register.pc += 2;
};

export const LDHL_SP_r8 = state => {
  const signedVal = (state.mmu.read(state.register.pc + 1) << 24) >> 24;
  const sum = (state.register.sp + signedVal) & 0xFFFF;
  const carryCheck = state.register.sp ^ signedVal ^ sum;

  state.register.hl = sum;
  state.register.pc += 1;

  state.flag.zero = false;
  state.flag.half = (carryCheck & 0x10) === 0x10;
  state.flag.subtract = false;
  state.flag.carry = (carryCheck & 0x100) === 0x100;
};

export const LD_SP_HL = state => {
  state.register.sp = state.register.hl;
};

export const LD_a16_SP = state => {
  const address = (state.mmu.read(state.register.pc + 2) << 8) + state.mmu.read(state.register.pc + 1);

  state.mmu.write(address, state.register.sp & 0xFF);
  state.mmu.write((address + 1) & 0xFFFF, state.register.sp >> 8);

  state.register.pc += 2;
};

/* PUSH
*******************************************/
export const PUSH_AF = state => {
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.a);
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.f);
};

export const PUSH_BC = state => {
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.b);
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.c);
};

export const PUSH_DE = state => {
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.d);
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.e);
};

export const PUSH_HL = state => {
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.h);
  state.register.sp -= 1;
  state.mmu.write(state.register.sp, state.register.l);
};

/* POP
*******************************************/
export const POP_AF = state => {
  state.register.f = state.mmu.read(state.register.sp);
  state.register.sp += 1;
  state.register.a = state.mmu.read(state.register.sp);
  state.register.sp += 1;
};

export const POP_BC = state => {
  state.register.c = state.mmu.read(state.register.sp);
  state.register.sp += 1;
  state.register.b = state.mmu.read(state.register.sp);
  state.register.sp += 1;
};

export const POP_DE = state => {
  state.register.e = state.mmu.read(state.register.sp);
  state.register.sp += 1;
  state.register.d = state.mmu.read(state.register.sp);
  state.register.sp += 1;
};

export const POP_HL = state => {
  state.register.l = state.mmu.read(state.register.sp);
  state.register.sp += 1;
  state.register.h = state.mmu.read(state.register.sp);
  state.register.sp += 1;
};
