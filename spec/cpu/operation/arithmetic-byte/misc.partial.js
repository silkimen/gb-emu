const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).Register;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* CPL
*******************************************/
describe('8 bit CPL operation', () => {
  it('complements value of A = 0', () => {
    state.register.a = 0;

    op.CPL.call(null, state);
    expect(state.register.a).toBe(255);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
  });

  it('complements value of A = 255', () => {
    state.register.a = 255;

    op.CPL.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
  });

  it('complements value of A = 170', () => {
    state.register.a = 0b10101010;

    op.CPL.call(null, state);
    expect(state.register.a).toBe(0b01010101);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
  });
});

/* SCF
*******************************************/
describe('8 bit SCF operation', () => {
  it('sets carry flag', () => {
    state.flag.subtract = true;
    state.flag.half = true;

    op.SCF.call(null, state);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(true);
  });
});

/* CCF
*******************************************/
describe('8 bit CCF operation', () => {
  it('complements carry flag', () => {
    state.flag.subtract = true;
    state.flag.half = true;
    state.flag.carry = true;

    op.CCF.call(null, state);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
  });
});
