const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).Register;

const COMBINED_REG_NAMES = [[ 'b', 'c' ], [ 'd', 'e' ], [ 'h', 'l' ]];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* DEC
*******************************************/
describe('16 bit decrement operation', () => {
  COMBINED_REG_NAMES.forEach(group => {
    const upperName = group.join('').toUpperCase();

    it(`decrements value of register ${upperName}`, () => {
      state.register[group[0]] = 1;
      state.register[group[1]] = 0;

      op[`DEC_${upperName}`].call(null, state);
      expect(state.register[group[0]]).toBe(0);
      expect(state.register[group[1]]).toBe(255);
    });

    it(`handles overflow correctly for register ${upperName}`, () => {
      state.register[group[0]] = 0;
      state.register[group[1]] = 0;

      op[`DEC_${upperName}`].call(null, state);
      expect(state.register[group[0]]).toBe(255);
      expect(state.register[group[1]]).toBe(255);
    });
  });

  it(`decrements value of register SP`, () => {
    state.register.sp = 256;

    op.DEC_SP.call(null, state);
    expect(state.register.sp).toBe(255);
  });

  it(`handles overflow correctly for register SP`, () => {
    state.register.sp = 0;

    op.DEC_SP.call(null, state);
    expect(state.register.sp).toBe(65535);
  });
});
