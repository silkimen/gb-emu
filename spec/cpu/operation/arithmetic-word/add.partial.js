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

/* ADD_HL
*******************************************/
describe('16 bit addition operation', () => {
  COMBINED_REG_NAMES.forEach(group => {
    const upperName = group.join('').toUpperCase();

    it(`adds value of register ${upperName} to HL`, () => {
      state.register.hl = 0x1010;
      state.register[group[0]] = 0x05;
      state.register[group[1]] = 0x05;

      op[`ADD_HL_${upperName}`].call(null, state);
      expect(state.register.hl).toBe(upperName === 'HL' ? 0x0A0A : 0x1515);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);
    });

    it(`handles overflow for addition of ${upperName} and HL`, () => {
      state.register.hl = 0xFFFF;
      state.register[group[0]] = upperName === 'HL' ? 0x88 : 0;
      state.register[group[1]] = upperName === 'HL' ? 0 : 1;

      op[`ADD_HL_${upperName}`].call(null, state);
      expect(state.register.hl).toBe(upperName === 'HL' ? 0x1000 : 0);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
      expect(state.flag.carry).toBe(true);
    });
  });

  it(`adds value of register SP to HL`, () => {
    state.register.hl = 0x1010;
    state.register.sp = 0x0505;

    op.ADD_HL_SP.call(null, state);
    expect(state.register.hl).toBe(0x1515);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
  });

  it(`handles overflow for addition of SP and HL`, () => {
    state.register.hl = 0xFFFF;
    state.register.sp = 1;

    op.ADD_HL_SP.call(null, state);
    expect(state.register.hl).toBe(0);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
  });
});
