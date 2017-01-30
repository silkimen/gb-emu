const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('./mmu.mock');
const Register = require(`${__base}cpu/register`).Register;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('16 bit load operation', () => {
  it('loads immediate data into BC', () => {
    state.mmu.write(1, 30);
    state.mmu.write(2, 31);

    op.LD_BC_d16(state);

    expect(state.register.b).toBe(31);
    expect(state.register.c).toBe(30);
    expect(state.register.pc).toBe(2);
  });
});
