const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

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

  it('loads immediate data into DE', () => {
    state.mmu.write(1, 30);
    state.mmu.write(2, 31);

    op.LD_DE_d16(state);

    expect(state.register.d).toBe(31);
    expect(state.register.e).toBe(30);
    expect(state.register.pc).toBe(2);
  });

  it('loads immediate data into HL', () => {
    state.mmu.write(1, 30);
    state.mmu.write(2, 31);

    op.LD_HL_d16(state);

    expect(state.register.h).toBe(31);
    expect(state.register.l).toBe(30);
    expect(state.register.pc).toBe(2);
  });

  it('loads immediate data into SP', () => {
    state.mmu.write(1, 0x10);
    state.mmu.write(2, 0x20);

    op.LD_SP_d16(state);

    expect(state.register.sp).toBe(0x2010);
    expect(state.register.pc).toBe(2);
  });

  it('loads value of HL into SP', () => {
    state.register.hl = 0x1E1E;

    op.LD_SP_HL(state);

    expect(state.register.sp).toBe(0x1E1E);
  });

  it('stores value of SP in memory on immediate address', () => {
    state.mmu.write(1, 0xEE);
    state.mmu.write(2, 0xFF);
    state.register.sp = 0x1E1F;

    op.LD_a16_SP(state);

    expect(state.mmu.read(0xFFEE)).toBe(0x1F);
    expect(state.mmu.read(0xFFEF)).toBe(0x1E);
  });

  it('loads value of SP + immediate signed 8 bit value into HL', () => {
    state.register.sp = 0x1208;
    state.mmu.write(1, -8);

    op.LDHL_SP_r8(state);

    expect(state.register.hl).toBe(0x1200);
    expect(state.register.pc).toBe(1);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
  });
});
