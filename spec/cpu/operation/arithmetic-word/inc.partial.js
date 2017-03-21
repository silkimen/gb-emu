const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const COMBINED_REG_NAMES = [[ 'b', 'c' ], [ 'd', 'e' ], [ 'h', 'l' ]];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* INC
*******************************************/
describe('16 bit increment operation', () => {
  COMBINED_REG_NAMES.forEach(group => {
    const upperName = group.join('').toUpperCase();

    it(`increments value of register ${upperName}`, () => {
      state.register[group[0]] = 0;
      state.register[group[1]] = 0;

      op[`INC_${upperName}`].call(null, state);
      expect(state.register[group[0]]).toBe(0);
      expect(state.register[group[1]]).toBe(1);
    });

    it(`handles overflow correctly for register ${upperName}`, () => {
      state.register[group[0]] = 255;
      state.register[group[1]] = 255;

      op[`INC_${upperName}`].call(null, state);
      expect(state.register[group[0]]).toBe(0);
      expect(state.register[group[1]]).toBe(0);
    });
  });

  it(`increments value of register SP`, () => {
    state.register.sp = 0;

    op.INC_SP.call(null, state);
    expect(state.register.sp).toBe(1);
  });

  it(`handles overflow correctly for register SP`, () => {
    state.register.sp = 65535;

    op.INC_SP.call(null, state);
    expect(state.register.sp).toBe(0);
  });
});
