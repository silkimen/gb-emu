const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('16 bit push operation', () => {
  it('pushes value of AF onto stack', () => {
    state.register.sp = 100;
    state.register.a = 0x12;
    state.register.f = 0x34;

    op.PUSH_AF(state);

    expect(state.register.sp).toBe(98);
    expect(state.mmu.read(99)).toBe(0x12);
    expect(state.mmu.read(98)).toBe(0x34);
  });

  it('pushes value of BC onto stack', () => {
    state.register.sp = 100;
    state.register.b = 0x12;
    state.register.c = 0x34;

    op.PUSH_BC(state);

    expect(state.register.sp).toBe(98);
    expect(state.mmu.read(99)).toBe(0x12);
    expect(state.mmu.read(98)).toBe(0x34);
  });

  it('pushes value of DE onto stack', () => {
    state.register.sp = 100;
    state.register.d = 0x12;
    state.register.e = 0x34;

    op.PUSH_DE(state);

    expect(state.register.sp).toBe(98);
    expect(state.mmu.read(99)).toBe(0x12);
    expect(state.mmu.read(98)).toBe(0x34);
  });

  it('pushes value of HL onto stack', () => {
    state.register.sp = 100;
    state.register.h = 0x12;
    state.register.l = 0x34;

    op.PUSH_HL(state);

    expect(state.register.sp).toBe(98);
    expect(state.mmu.read(99)).toBe(0x12);
    expect(state.mmu.read(98)).toBe(0x34);
  });
});
