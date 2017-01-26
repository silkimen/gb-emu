export const NOOP = () => { /* no operation */ };

export const LD_BC_d16 = state => {
  state.register.c = state.mmu.read(state.register.pc);
  state.register.b = state.mmu.read(state.register.pc + 1);
  state.register.pc = (state.register.pc + 2) & 0xFFFF;
};

export const LD_BC_A = state => {
  state.mmu.write((state.register.b << 8) + state.register.c, state.register.a);
};

export const INC_BC = state => {
  const val = (state.register.b << 8) + state.register.c + 1;
  state.register.b = (val & 0xFF) >> 8;
  state.register.c = val & 0xFF;
};

export const INC_B = state => {
  state.register.b = (state.register.b + 1) & 0xFF;
  state.flag.zero = state.register.b === 0;
  state.flag.subtract = false;
  state.flag.half = state.register.b & 0xF === 0;
};

export const DEC_B = state => {
  state.register.b = (state.register.b - 1) & 0xFF;
  state.flag.zero = state.register.b === 0;
  state.flag.subtract = true;
  state.flag.half = state.register.b & 0xF === 0xF;
};
