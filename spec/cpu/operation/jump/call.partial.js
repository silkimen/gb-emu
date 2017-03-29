const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('call operation "CALL"', () => {
  it('pushes address of next instruction onto stack and jumps to immediate address', () => {
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_a16(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.mmu.read(99)).toBe(0x23);
    expect(state.mmu.read(98)).toBe(0x48);
  });
});

describe('call operation "CALL NZ"', () => {
  it('pushes address of next instruction onto stack and jumps to immediate address when zero flag is false', () => {
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_NZ_a16(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.mmu.read(99)).toBe(0x23);
    expect(state.mmu.read(98)).toBe(0x48);
  });

  it('does not jump when zero flag is true', () => {
    state.flag.zero = true;
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_NZ_a16(state);

    expect(state.register.pc).toBe(0x2347);
    expect(state.register.sp).toBe(100);
  });
});

describe('call operation "CALL Z"', () => {
  it('pushes address of next instruction onto stack and jumps to immediate address when zero flag is true', () => {
    state.flag.zero = true;
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_Z_a16(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.mmu.read(99)).toBe(0x23);
    expect(state.mmu.read(98)).toBe(0x48);
  });

  it('does not jump when zero flag is false', () => {
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_Z_a16(state);

    expect(state.register.pc).toBe(0x2347);
    expect(state.register.sp).toBe(100);
  });
});

describe('call operation "CALL NC"', () => {
  it('pushes address of next instruction onto stack and jumps to immediate address when carry flag is false', () => {
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_NC_a16(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.mmu.read(99)).toBe(0x23);
    expect(state.mmu.read(98)).toBe(0x48);
  });

  it('does not jump when zero flag is true', () => {
    state.flag.carry = true;
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_NC_a16(state);

    expect(state.register.pc).toBe(0x2347);
    expect(state.register.sp).toBe(100);
  });
});

describe('call operation "CALL C"', () => {
  it('pushes address of next instruction onto stack and jumps to immediate address when carry flag is true', () => {
    state.flag.carry = true;
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_C_a16(state);

    expect(state.register.pc).toBe(0x1234);
    expect(state.mmu.read(99)).toBe(0x23);
    expect(state.mmu.read(98)).toBe(0x48);
  });

  it('does not jump when zero flag is false', () => {
    state.register.pc = 0x2345;
    state.register.sp = 100;
    state.mmu.write(0x2346, 0x34);
    state.mmu.write(0x2347, 0x12);

    op.CALL_C_a16(state);

    expect(state.register.pc).toBe(0x2347);
    expect(state.register.sp).toBe(100);
  });
});
