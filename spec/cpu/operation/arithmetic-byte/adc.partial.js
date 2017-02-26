const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).Register;

const REG_NAMES_2_BE_TESTED = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* ADC
*******************************************/
describe('8 bit add with carry operation', () => {
  it('adds value A and carry to A', () => {
    state.flag.carry = true;
    state.register.a = 1;
    op.ADC_A_A.call(null, state);
    expect(state.register.a).toBe(3);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.flag.carry = false;
    state.register.a = 1;
    op.ADC_A_A.call(null, state);
    expect(state.register.a).toBe(2);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.flag.carry = true;
    state.register.a = 0x80;
    op.ADC_A_A.call(null, state);
    expect(state.register.a).toBe(1);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(true);

    state.flag.carry = false;
    state.register.a = 0x80;
    op.ADC_A_A.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(true);
  });

  // generate ADD tests for B to L
  REG_NAMES_2_BE_TESTED.slice(1).forEach(name => {
    const upperName = name.toUpperCase();

    it(`adds value ${upperName} and carry to A`, () => {
      state.register[name] = 1;

      state.flag.carry = true;
      state.register.a = 0;
      op[`ADC_A_${upperName}`].call(null, state);
      expect(state.register.a).toBe(2);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);

      state.flag.carry = false;
      state.register.a = 0;
      op[`ADC_A_${upperName}`].call(null, state);
      expect(state.register.a).toBe(1);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);

      state.flag.carry = true;
      state.register.a = 0x0E;
      op[`ADC_A_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0x10);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
      expect(state.flag.carry).toBe(false);

      state.flag.carry = false;
      state.register.a = 0x0F;
      op[`ADC_A_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0x10);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
      expect(state.flag.carry).toBe(false);

      state.flag.carry = true;
      state.register.a = 0xFE;
      op[`ADC_A_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
      expect(state.flag.carry).toBe(true);

      state.flag.carry = false;
      state.register.a = 0xFF;
      op[`ADC_A_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(false);
      expect(state.flag.half).toBe(true);
      expect(state.flag.carry).toBe(true);
    });
  });

  it('adds value of address (HL) and carry to A', () => {
    state.register.h = 0;
    state.register.l = 0;
    state.mmu.write('0', '1');

    state.flag.carry = true;
    state.register.a = 0;
    op.ADC_A_HL.call(null, state);
    expect(state.register.a).toBe(2);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.flag.carry = false;
    state.register.a = 0;
    op.ADC_A_HL.call(null, state);
    expect(state.register.a).toBe(1);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.flag.carry = true;
    state.register.a = 0x0E;
    op.ADC_A_HL.call(null, state);
    expect(state.register.a).toBe(0x10);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);

    state.flag.carry = false;
    state.register.a = 0x0F;
    op.ADC_A_HL.call(null, state);
    expect(state.register.a).toBe(0x10);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);

    state.flag.carry = true;
    state.register.a = 0xFF;
    op.ADC_A_HL.call(null, state);
    expect(state.register.a).toBe(1);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);

    state.flag.carry = false;
    state.register.a = 0xFF;
    op.ADC_A_HL.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
  });

  it('adds immediate value and carry to A', () => {
    state.register.pc = 0;
    state.mmu.write(1, 1);
    state.mmu.write(2, 1);
    state.mmu.write(3, 1);
    state.mmu.write(4, 1);
    state.mmu.write(5, 1);
    state.mmu.write(6, 1);

    state.flag.carry = true;
    state.register.a = 0;
    op.ADC_A_d8.call(null, state);
    expect(state.register.a).toBe(2);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(1);

    state.flag.carry = false;
    state.register.a = 0;
    op.ADC_A_d8.call(null, state);
    expect(state.register.a).toBe(1);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(2);

    state.flag.carry = true;
    state.register.a = 0x0E;
    op.ADC_A_d8.call(null, state);
    expect(state.register.a).toBe(0x10);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(3);

    state.flag.carry = false;
    state.register.a = 0x0F;
    op.ADC_A_d8.call(null, state);
    expect(state.register.a).toBe(0x10);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(4);

    state.flag.carry = true;
    state.register.a = 0xFE;
    op.ADC_A_d8.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
    expect(state.register.pc).toBe(5);

    state.flag.carry = false;
    state.register.a = 0xFF;
    op.ADC_A_d8.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(false);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
    expect(state.register.pc).toBe(6);
  });
});
