const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];
const expectedValues = [ 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80 ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('bit set operation', () => {
  REG_NAMES.forEach(register => {
    for (let bit = 0; bit < 8; ++bit) {
      const upperName = register.toUpperCase();

      // eslint-disable-next-line no-loop-func
      it(`sets bit ${bit} in register ${upperName}`, () => {
        op[`SET_${bit}_${register}`].call(null, state);
        expect(state.register[register]).toBe(expectedValues[bit]);
      });
    }
  });

  for (let bit = 0; bit < 8; ++bit) {
    // eslint-disable-next-line no-loop-func
    it(`sets bit ${bit} in value of (HL)`, () => {
      state.register.hl = 100;
      op[`SET_${bit}_$HL$`].call(null, state);
      expect(state.mmu.read(100)).toBe(expectedValues[bit]);
    });
  }
});
