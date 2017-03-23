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

/* CP
*******************************************/
describe('8 bit compare operation', () => {
  // generate AND tests for A to L
  REG_NAMES_2_BE_TESTED.forEach(name => {
    const upperName = name.toUpperCase();

    it(`compares register A with register ${upperName}`, () => {
      state.register.a = 0;
      state.register[name] = 0;

      op[`CP_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);

      state.register.a = 255;
      state.register[name] = 255;

      op[`CP_${upperName}`].call(null, state);
      expect(state.register.a).toBe(255);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);

      state.register.a = 16;
      state.register[name] = 1;

      op[`CP_${upperName}`].call(null, state);
      expect(state.register.a).toBe(name === 'a' ? 1 : 16);
      expect(state.flag.zero).toBe(name === 'a');
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(name !== 'a');
      expect(state.flag.carry).toBe(false);

      state.register.a = 1;
      state.register[name] = 2;

      op[`CP_${upperName}`].call(null, state);
      expect(state.register.a).toBe(name === 'a' ? 2 : 1);
      expect(state.flag.zero).toBe(name === 'a');
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(name !== 'a');
      expect(state.flag.carry).toBe(name !== 'a');
    });
  });

  it(`compares register A with (HL)`, () => {
    state.register.h = 0;
    state.register.l = 0;

    state.mmu.write(0, 0);
    state.register.a = 0;

    op.CP_$HL$.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.mmu.write(0, 255);
    state.register.a = 255;

    op.CP_$HL$.call(null, state);
    expect(state.register.a).toBe(255);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.mmu.write(0, 1);
    state.register.a = 16;

    op.CP_$HL$.call(null, state);
    expect(state.register.a).toBe(16);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);

    state.mmu.write(0, 2);
    state.register.a = 1;

    op.CP_$HL$.call(null, state);
    expect(state.register.a).toBe(1);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
  });

  it(`compares register A with (immediate value)`, () => {
    state.register.pc = 0;

    state.mmu.write(1, 0);
    state.register.a = 0;

    op.CP_d8.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(1);

    state.mmu.write(2, 255);
    state.register.a = 255;

    op.CP_d8.call(null, state);
    expect(state.register.a).toBe(255);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(2);

    state.mmu.write(3, 1);
    state.register.a = 16;

    op.CP_d8.call(null, state);
    expect(state.register.a).toBe(16);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(3);

    state.mmu.write(4, 2);
    state.register.a = 1;

    op.CP_d8.call(null, state);
    expect(state.register.a).toBe(1);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
    expect(state.register.pc).toBe(4);
  });
});
