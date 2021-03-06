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

describe('16 bit push operation', () => {
  REG_GROUP_NAMES.forEach(group => {
    const upperName = group.toUpperCase();

    it(`pushes value of ${upperName} onto stack`, () => {
      state.register.sp = 100;
      state.register[group.charAt(0)] = 0x12;
      state.register[group.charAt(1)] = 0x34;

      op[`PUSH_${upperName}`](state);

      expect(state.register.sp).toBe(98);
      expect(state.mmu.read(99)).toBe(0x12);
      expect(state.mmu.read(98)).toBe(0x34);
    });
  });
});
