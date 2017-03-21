const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const REG_NAMES_2_BE_TESTED = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* XOR
*******************************************/
describe('8 bit bitwise XOR operation', () => {
  // generate AND tests for A to L
  REG_NAMES_2_BE_TESTED.forEach(name => {
    const upperName = name.toUpperCase();

    it(`modifies register A to be A XOR ${upperName}`, () => {
      state.register.a = 0;
      state.register[name] = 0;

      op[`XOR_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);

      state.register.a = 255;
      state.register[name] = 255;

      op[`XOR_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);

      state.register.a = 0b10101100;
      state.register[name] = 0b00100100;

      op[`XOR_${upperName}`].call(null, state);
      expect(state.register.a).toBe(name === 'a' ? 0 : 0b10001000);
      expect(state.flag.zero).toBe(name === 'a');
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);
    });
  });

  it(`modifies register A to be A XOR (HL)`, () => {
    state.register.h = 0;
    state.register.l = 0;

    state.mmu.write(0, 0);
    state.register.a = 0;

    op[`XOR_HL`].call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.mmu.write(0, 255);
    state.register.a = 255;

    op[`XOR_HL`].call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.mmu.write(0, 0b10101100);
    state.register.a = 0b00100100;

    op[`XOR_HL`].call(null, state);
    expect(state.register.a).toBe(0b10001000);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
  });

  it(`modifies register A to be A XOR (immediate value)`, () => {
    state.register.pc = 0;

    state.mmu.write(1, 0);
    state.register.a = 0;

    op[`XOR_d8`].call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(1);

    state.mmu.write(2, 255);
    state.register.a = 255;

    op[`XOR_d8`].call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(2);

    state.mmu.write(3, 0b10101100);
    state.register.a = 0b00100100;

    op[`XOR_d8`].call(null, state);
    expect(state.register.a).toBe(0b10001000);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(3);
  });
});
