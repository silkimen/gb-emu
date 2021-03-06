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

/* DEC
*******************************************/
describe('8 bit decrement operation', () => {
  // generate DEC tests for A to L
  REG_NAMES_2_BE_TESTED.forEach(name => {
    const upperName = name.toUpperCase();

    it(`decrements value ${upperName}`, () => {
      state.register[name] = 1;
      op[`DEC_${upperName}`].call(null, state);
      expect(state.register[name]).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(false);

      op[`DEC_${upperName}`].call(null, state);
      expect(state.register[name]).toBe(255);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(true);
    });
  });

  it(`decrements value (HL)`, () => {
    state.mmu.write(0xAABB, 1);
    state.register.h = 0xAA;
    state.register.l = 0xBB;

    op.DEC_$HL$.call(null, state);

    expect(state.mmu.read(0xAABB)).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);

    op.DEC_$HL$.call(null, state);

    expect(state.mmu.read(0xAABB)).toBe(255);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
  });
});
