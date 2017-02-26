const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).Register;

const REG_NAMES_2_BE_TESTED = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* INC
*******************************************/
describe('8 bit increment operation', () => {
  // generate INC tests for A to L
  REG_NAMES_2_BE_TESTED.forEach(name => {
    const upperName = name.toUpperCase();

    it(`increments value ${upperName}`, () => {
      state.register[name] = 0;
      op[`INC_${upperName}`].call(null, state);
      expect(state.register[name]).toBe(1);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(false);

      state.register[name] = 255;
      op[`INC_${upperName}`].call(null, state);
      expect(state.register[name]).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
    });
  });

  it(`increments value HL`, () => {
    state.mmu.write(0xAABB, 50);
    state.register.h = 0xAA;
    state.register.l = 0xBB;

    op.INC_$HL.call(null, state);

    expect(state.mmu.read(0xAABB)).toBe(51);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);

    state.mmu.write(0xAABB, 255);
    state.register.h = 0xAA;
    state.register.l = 0xBB;

    op.INC_$HL.call(null, state);

    expect(state.mmu.read(0xAABB)).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
  });
});
