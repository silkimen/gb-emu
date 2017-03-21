const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];
const expectedValues = [ 0xFE, 0xFD, 0xFB, 0xF7, 0xEF, 0xDF, 0xBF, 0x7F ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('bit reset operation', () => {
  REG_NAMES.forEach(register => {
    for (let bit = 0; bit < 8; ++bit) {
      const upperName = register.toUpperCase();

      // eslint-disable-next-line no-loop-func
      it(`clears bit ${bit} in register ${upperName}`, () => {
        state.register[register] = 0xFF;
        op[`RES_${bit}_${register}`].call(null, state);
        expect(state.register[register]).toBe(expectedValues[bit]);
      });
    }
  });

  for (let bit = 0; bit < 8; ++bit) {
    // eslint-disable-next-line no-loop-func
    it(`clears bit ${bit} in value of (HL)`, () => {
      state.register.hl = 100;
      state.mmu.write(100, 0xFF);

      op[`RES_${bit}_HL`].call(null, state);
      expect(state.mmu.read(100)).toBe(expectedValues[bit]);
    });
  }
});
