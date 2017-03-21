const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('8 bit store operation', () => {
  it('stores value A to address (BC)', () => {
    state.register.a = 100;
    state.register.b = 0xBB;
    state.register.c = 0xCC;

    op.LD_BC_A(state);

    expect(state.mmu.read(0xBBCC)).toBe(100);
    expect(state.register.pc).toBe(0);
  });

  it('stores value A to address (DE)', () => {
    state.register.a = 100;
    state.register.d = 0xDD;
    state.register.e = 0xEE;

    op.LD_DE_A(state);

    expect(state.mmu.read(0xDDEE)).toBe(100);
    expect(state.register.pc).toBe(0);
  });
});
