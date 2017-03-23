const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('./mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

describe('8 bit load / store operation', () => {
  REG_NAMES.forEach(source => {
    const sourceName = source.toUpperCase();

    REG_NAMES.forEach(target => {
      const targetName = target.toUpperCase();

      it(`loads value ${sourceName} into ${targetName}`, () => {
        state.register[source] = 0x15;
        op[`LD_${targetName}_${sourceName}`].call(null, state);
        expect(state.register[target]).toBe(0x15);
      });
    });

    it(`stores value ${sourceName} into (HL)`, () => {
      state.register[source] = 0x15;
      state.register.h = 0x20;
      state.register.l = 0x25;

      op[`LD_$HL$_${sourceName}`].call(null, state);
      switch (source) {
        case 'h':
          expect(state.mmu.read(0x2025)).toBe(0x20);
          break;
        case 'l':
          expect(state.mmu.read(0x2025)).toBe(0x25);
          break;
        default:
          expect(state.mmu.read(0x2025)).toBe(0x15);
      }
    });
  });

  REG_NAMES.forEach(target => {
    const targetName = target.toUpperCase();

    it(`loads immediate value into (${targetName})`, () => {
      state.register.pc = 10;
      state.mmu.write(11, 20);

      op[`LD_${targetName}_d8`].call(null, state);
      expect(state.register[target]).toBe(20);
      expect(state.register.pc).toBe(11);
    });

    it(`loads value of (HL) into (${targetName})`, () => {
      state.mmu.write(0x5510, 0x67);
      state.register.h = 0x55;
      state.register.l = 0x10;

      op[`LD_${targetName}_$HL$`].call(null, state);
      expect(state.mmu.read(0x5510)).toBe(0x67);
    });
  });

  it('stores value A into address (BC)', () => {
    state.register.a = 100;
    state.register.b = 0xBB;
    state.register.c = 0xCC;

    op.LD_$BC$_A(state);

    expect(state.mmu.read(0xBBCC)).toBe(100);
    expect(state.register.pc).toBe(0);
  });

  it('stores value A into address (DE)', () => {
    state.register.a = 100;
    state.register.d = 0xDD;
    state.register.e = 0xEE;

    op.LD_$DE$_A(state);

    expect(state.mmu.read(0xDDEE)).toBe(100);
    expect(state.register.pc).toBe(0);
  });

  it('copies immediate value into address (HL)', () => {
    state.register.pc = 100;
    state.register.h = 0xDD;
    state.register.l = 0xEE;
    state.mmu.write(101, 0xFE);

    op.LD_$HL$_d8(state);

    expect(state.mmu.read(0xDDEE)).toBe(0xFE);
    expect(state.register.pc).toBe(101);
  });

  it('loads value (HL) into A and increments HL', () => {
    state.register.h = 0xDD;
    state.register.l = 0xEE;
    state.mmu.write(0xDDEE, 0x22);

    op.LD_A_$HLI$(state);

    expect(state.register.a).toBe(0x22);
    expect(state.register.hl).toBe(0xDDEF);
  });

  it('loads value (HL) into A and decrements HL', () => {
    state.register.h = 0xDD;
    state.register.l = 0xEE;
    state.mmu.write(0xDDEE, 0x22);

    op.LD_A_$HLD$(state);

    expect(state.register.a).toBe(0x22);
    expect(state.register.hl).toBe(0xDDED);
  });

  it('loads value (BC) into A', () => {
    state.register.b = 0xDD;
    state.register.c = 0xEE;
    state.mmu.write(0xDDEE, 0x22);

    op.LD_A_$BC$(state);

    expect(state.register.a).toBe(0x22);
  });

  it('loads value (DE) into A', () => {
    state.register.d = 0xDD;
    state.register.e = 0xEE;
    state.mmu.write(0xDDEE, 0x22);

    op.LD_A_$DE$(state);

    expect(state.register.a).toBe(0x22);
  });

  it('loads value at (immediate 8 bit value + 0xFF00) into A', () => {
    state.register.pc = 20;
    state.mmu.write(21, 0x22);
    state.mmu.write(0xFF22, 0x22);

    op.LDH_A_a8(state);

    expect(state.register.a).toBe(0x22);
    expect(state.register.pc).toBe(21);
  });

  it('loads value at immediate 16 bit address into A', () => {
    state.register.pc = 20;
    state.mmu.write(21, 0x34);
    state.mmu.write(22, 0x12);
    state.mmu.write(0x1234, 0x22);

    op.LD_A_a16(state);

    expect(state.register.a).toBe(0x22);
    expect(state.register.pc).toBe(22);
  });

  it('loads value at address (0xFF00 + C) into A', () => {
    state.register.c = 0x44;
    state.mmu.write(0xFF44, 0x22);

    op.LD_A_$C$(state);

    expect(state.register.a).toBe(0x22);
  });

  it('stores value of A into (0xFF00 + C)', () => {
    state.register.a = 0x44;
    state.register.c = 0x77;

    op.LD_$C$_A(state);

    expect(state.mmu.read(0xFF77)).toBe(0x44);
  });

  it('stores value of A into (HL) and increments HL', () => {
    state.register.a = 0x44;
    state.register.h = 0x77;
    state.register.l = 0x88;

    op.LD_$HLI$_A(state);

    expect(state.mmu.read(0x7788)).toBe(0x44);
    expect(state.register.hl).toBe(0x7789);
  });

  it('stores value of A into (HL) and decrements HL', () => {
    state.register.a = 0x44;
    state.register.h = 0x77;
    state.register.l = 0x88;

    op.LD_$HLD$_A(state);

    expect(state.mmu.read(0x7788)).toBe(0x44);
    expect(state.register.hl).toBe(0x7787);
  });

  it('stores value of A into (immediate 8 bit value + 0xFF00)', () => {
    state.register.a = 0x44;
    state.register.pc = 20;
    state.mmu.write(21, 0xBB);

    op.LDH_a8_A(state);

    expect(state.mmu.read(0xFFBB)).toBe(0x44);
    expect(state.register.pc).toBe(21);
  });

  it('stores value of A into immediate 16 bit address', () => {
    state.register.a = 0x44;
    state.register.pc = 20;
    state.mmu.write(21, 0x34);
    state.mmu.write(22, 0x12);

    op.LD_a16_A(state);

    expect(state.mmu.read(0x1234)).toBe(0x44);
    expect(state.register.pc).toBe(22);
  });
});
