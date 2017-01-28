const op = require(__base + 'cpu/operation');
const MmuMock = require('./mmu.mock');
const Register = require(__base + 'cpu/register').Register;

let state = null;

describe('operations', () => {

  beforeEach(() => {
    const { register, flag } = new Register();
    const mmu = new MmuMock();

    state = { register, flag, mmu };
  });

  describe('load operations', () => {
    it('loads 16 bit data into BC', () => {
      state.register.pc = 1;
      state.mmu.write(1, 30);
      state.mmu.write(2, 31);

      op.LD_BC_d16(state);

      expect(state.register.b).toBe(31);
      expect(state.register.c).toBe(30);
      expect(state.register.pc).toBe(3);
    });
  });

});
