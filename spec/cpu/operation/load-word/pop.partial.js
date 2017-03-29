const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const REG_GROUP_NAMES = [ 'af', 'bc', 'de', 'hl' ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('16 bit pop operation', () => {
  REG_GROUP_NAMES.forEach(group => {
    const upperName = group.toUpperCase();

    it(`pops value from stack into ${upperName}`, () => {
      state.register.sp = 100;
      state.mmu.write(100, 0x34);
      state.mmu.write(101, 0x12);

      op[`POP_${upperName}`].call(null, state);

      expect(state.register.sp).toBe(102);
      expect(state.register[group]).toBe(0x1234);
    });
  });
});
