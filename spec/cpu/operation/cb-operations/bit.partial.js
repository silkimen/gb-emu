const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('bit access operation', () => {
  REG_NAMES.forEach(register => {
    for (let bit = 0; bit < 8; ++bit) {
      const upperName = register.toUpperCase();

      // eslint-disable-next-line no-loop-func
      it(`sets zero flag when bit ${bit} in register ${upperName} is zero`, () => {
        op[`BIT_${bit}_${register}`].call(null, state);
        expect(state.flag.zero).toBe(true);
        expect(state.flag.subtract).toBe(false);
        expect(state.flag.half).toBe(true);
      });

      // eslint-disable-next-line no-loop-func
      it(`clears zero flag when bit ${bit} in register ${upperName} is not zero`, () => {
        state.register[register] = 0xFF;

        op[`BIT_${bit}_${register}`].call(null, state);
        expect(state.flag.zero).toBe(false);
        expect(state.flag.subtract).toBe(false);
        expect(state.flag.half).toBe(true);
      });
    }
  });

  for (let bit = 0; bit < 8; ++bit) {
    // eslint-disable-next-line no-loop-func
    it(`sets zero flag when bit ${bit} of value (HL) is zero`, () => {
      op[`BIT_${bit}_HL`].call(null, state);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
    });

    // eslint-disable-next-line no-loop-func
    it(`clears zero flag when bit ${bit} of value (HL) is not zero`, () => {
      state.register.hl = 100;
      state.mmu.write(100, 0xFF);

      op[`BIT_${bit}_HL`].call(null, state);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
    });
  }
});
