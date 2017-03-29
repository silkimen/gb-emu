const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('jump relative operation "JR"', () => {
  it('adds immediate positive value to PC', () => {
    state.mmu.write(1, 20);

    op.JR_r8(state);

    expect(state.register.pc).toBe(21);
  });

  it('adds immediate negative value to PC', () => {
    state.register.pc = 100;
    state.mmu.write(101, -20);

    op.JR_r8(state);

    expect(state.register.pc).toBe(81);
  });
});

describe('jump relative operation "JR NZ"', () => {
  it('adds immediate positive value to PC when zero flag is false', () => {
    state.mmu.write(1, 20);

    op.JR_NZ_r8(state);

    expect(state.register.pc).toBe(21);
  });

  it('adds immediate negative value to PC when zero flag is false', () => {
    state.register.pc = 100;
    state.mmu.write(101, -20);

    op.JR_NZ_r8(state);

    expect(state.register.pc).toBe(81);
  });

  it('does not jump when zero flag is true', () => {
    state.flag.zero = true;
    state.mmu.write(1, 20);

    op.JR_NZ_r8(state);

    expect(state.register.pc).toBe(1);
  });
});

describe('jump relative operation "JR Z"', () => {
  it('adds immediate positive value to PC when zero flag is true', () => {
    state.flag.zero = true;
    state.mmu.write(1, 20);

    op.JR_Z_r8(state);

    expect(state.register.pc).toBe(21);
  });

  it('adds immediate negative value to PC when zero flag is true', () => {
    state.flag.zero = true;
    state.register.pc = 100;
    state.mmu.write(101, -20);

    op.JR_Z_r8(state);

    expect(state.register.pc).toBe(81);
  });

  it('does not jump when zero flag is false', () => {
    state.flag.zero = false;
    state.mmu.write(1, 20);

    op.JR_Z_r8(state);

    expect(state.register.pc).toBe(1);
  });
});

describe('jump relative operation "JR NC"', () => {
  it('adds immediate positive value to PC when carry flag is false', () => {
    state.mmu.write(1, 20);

    op.JR_NC_r8(state);

    expect(state.register.pc).toBe(21);
  });

  it('adds immediate negative value to PC when zero flag is false', () => {
    state.register.pc = 100;
    state.mmu.write(101, -20);

    op.JR_NC_r8(state);

    expect(state.register.pc).toBe(81);
  });

  it('does not jump when zero flag is true', () => {
    state.flag.carry = true;
    state.mmu.write(1, 20);

    op.JR_NC_r8(state);

    expect(state.register.pc).toBe(1);
  });
});

describe('jump relative operation "JR C"', () => {
  it('adds immediate positive value to PC when carry flag is true', () => {
    state.flag.carry = true;
    state.mmu.write(1, 20);

    op.JR_C_r8(state);

    expect(state.register.pc).toBe(21);
  });

  it('adds immediate negative value to PC when zero flag is true', () => {
    state.flag.carry = true;
    state.register.pc = 100;
    state.mmu.write(101, -20);

    op.JR_C_r8(state);

    expect(state.register.pc).toBe(81);
  });

  it('does not jump when zero flag is false', () => {
    state.mmu.write(1, 20);

    op.JR_C_r8(state);

    expect(state.register.pc).toBe(1);
  });
});
