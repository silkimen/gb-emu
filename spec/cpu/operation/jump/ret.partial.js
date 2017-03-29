const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('return operation "RET"', () => {
  it('sets PC to 16 bit value of (SP)', () => {
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.register.sp).toBe(102);
  });
});

describe('return operation "RET NZ"', () => {
  it('sets PC to 16 bit value of (SP) when zero flag is false', () => {
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_NZ(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.register.sp).toBe(102);
  });

  it('does not jump when zero flag is true', () => {
    state.flag.zero = true;
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_NZ(state);

    expect(state.register.pc).toBe(0);
  });
});

describe('return operation "RET Z"', () => {
  it('sets PC to 16 bit value of (SP) when zero flag is true', () => {
    state.flag.zero = true;
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_Z(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.register.sp).toBe(102);
  });

  it('does not jump when zero flag is false', () => {
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_Z(state);

    expect(state.register.pc).toBe(0);
  });
});

describe('return operation "RET NC"', () => {
  it('sets PC to 16 bit value of (SP) when carry flag is false', () => {
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_NC(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.register.sp).toBe(102);
  });

  it('does not jump when carry flag is true', () => {
    state.flag.carry = true;
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_NC(state);

    expect(state.register.pc).toBe(0);
  });
});

describe('return operation "RET C"', () => {
  it('sets PC to 16 bit value of (SP) when carry flag is true', () => {
    state.flag.carry = true;
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_C(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.register.sp).toBe(102);
  });

  it('does not jump when carry flag is false', () => {
    state.register.sp = 100;
    state.mmu.write(100, 0x34);
    state.mmu.write(101, 0x12);

    op.RET_C(state);

    expect(state.register.pc).toBe(0);
  });
});
