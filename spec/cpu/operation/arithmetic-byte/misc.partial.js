const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).Register;

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* DAA
*******************************************/
// --------------------------------------------------------------------------------
// |           | C Flag  | HEX value in | H Flag | HEX value in | Number  | C flag|
// | Operation | Before  | upper digit  | Before | lower digit  | added   | After |
// |           | DAA     | (bit 7-4)    | DAA    | (bit 3-0)    | to byte | DAA   |
// |------------------------------------------------------------------------------|
// |           |    0    |     0-9      |   0    |     0-9      |   00    |   0   |✅
// |   ADD     |    0    |     0-8      |   0    |     A-F      |   06    |   0   |✅
// |           |    0    |     0-9      |   1    |     0-3      |   06    |   0   |✅
// |   ADC     |    0    |     A-F      |   0    |     0-9      |   60    |   1   |✅
// |           |    0    |     9-F      |   0    |     A-F      |   66    |   1   |✅
// |   INC     |    0    |     A-F      |   1    |     0-3      |   66    |   1   |✅
// |           |    1    |     0-2      |   0    |     0-9      |   60    |   1   |✅
// |           |    1    |     0-2      |   0    |     A-F      |   66    |   1   |✅
// |           |    1    |     0-3      |   1    |     0-3      |   66    |   1   |✅
// |------------------------------------------------------------------------------|
// |   SUB     |    0    |     0-9      |   0    |     0-9      |   00    |   0   |✅
// |   SBC     |    0    |     0-8      |   1    |     6-F      |   FA    |   0   |✅
// |   DEC     |    1    |     7-F      |   0    |     0-9      |   A0    |   1   |✅
// |   NEG     |    1    |     6-F      |   1    |     6-F      |   9A    |   1   |✅
// |------------------------------------------------------------------------------|
describe('8 bit DAA operation', () => {
  describe('when subtract flag is not set', () => {
    it('adjusts correctly when both digits < A', () => {
      state.register.a = 0x90 + 0x09;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x99);
    });

    it('adjusts correctly when lower digit > 9 and upper digit < 9', () => {
      state.register.a = 0x09 + 0x01;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x10);
    });

    it('adjusts correctly when lower digit < 4 and upper digit < A and half carry flag is set', () => {
      state.register.a = 0x09 + 0x07;
      state.flag.half = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x16);
    });

    it('adjusts correctly when lower digit < A and upper digit > 9', () => {
      state.register.a = 0x90 + 0x10;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x00);
      expect(state.flag.carry).toBe(true);
    });

    it('adjusts correctly when lower digit > 9 and upper digit > 8', () => {
      state.register.a = 0x90 + 0x19;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x09);
      expect(state.flag.carry).toBe(true);
    });

    it('adjusts correctly when lower digit < 4 and upper digit > 9 and half carry is set', () => {
      state.register.a = 0x99 + 0x09;
      state.flag.half = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x08);
      expect(state.flag.carry).toBe(true);
    });

    it('adjusts correctly when lower digit < A and upper digit < 3 and carry is set', () => {
      state.register.a = 0x90 + 0x90;
      state.flag.carry = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x80);
      expect(state.flag.carry).toBe(true);
    });

    it('adjusts correctly when lower digit > 9 and upper digit < 3 and carry is set', () => {
      state.register.a = 0x91 + 0x99;
      state.flag.carry = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x90);
      expect(state.flag.carry).toBe(true);
    });

    it('adjusts correctly when lower digit < 4 and upper digit < 4 and half carry and carry are set', () => {
      state.register.a = 0x99 + 0x99;
      state.flag.half = true;
      state.flag.carry = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x98);
      expect(state.flag.carry).toBe(true);
    });
  });

  describe('when subtract flag is set', () => {
    it('adjusts correctly when both digits < A', () => {
      state.register.a = 0x99 - 0x55;
      state.flag.subtract = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x44);
    });

    it('adjusts correctly when lower digit > 5 and upper digit < 9 and half carry is set', () => {
      state.register.a = 0x90 - 0x01;
      state.flag.subtract = true;
      state.flag.half = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x89);
    });

    it('adjusts correctly when lower digit < A and upper digit > 6 and carry is set', () => {
      state.register.a = 0x10 - 0x80;
      state.flag.subtract = true;
      state.flag.carry = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x30);
      expect(state.flag.carry).toBe(true);
    });

    it('adjusts correctly when both digit > 5 and half carry and carry are set', () => {
      state.register.a = 0x33 - 0x99;
      state.flag.subtract = true;
      state.flag.half = true;
      state.flag.carry = true;

      op.DAA.call(null, state);
      expect(state.register.a).toBe(0x34);
      expect(state.flag.carry).toBe(true);
    });
  });
});

/* CPL
*******************************************/
describe('8 bit CPL operation', () => {
  it('complements value of A = 0', () => {
    state.register.a = 0;

    op.CPL.call(null, state);
    expect(state.register.a).toBe(255);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
  });

  it('complements value of A = 255', () => {
    state.register.a = 255;

    op.CPL.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
  });

  it('complements value of A = 170', () => {
    state.register.a = 0b10101010;

    op.CPL.call(null, state);
    expect(state.register.a).toBe(0b01010101);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
  });
});

/* SCF
*******************************************/
describe('8 bit SCF operation', () => {
  it('sets carry flag', () => {
    state.flag.subtract = true;
    state.flag.half = true;

    op.SCF.call(null, state);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(true);
  });
});

/* CCF
*******************************************/
describe('8 bit CCF operation', () => {
  it('complements carry flag', () => {
    state.flag.subtract = true;
    state.flag.half = true;
    state.flag.carry = true;

    op.CCF.call(null, state);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
  });
});
