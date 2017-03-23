const op = require(`${__base}cpu/operation/operation`).default;
const MmuMock = require('../mmu.mock');
const Register = require(`${__base}cpu/register`).default;

const REG_NAMES_2_BE_TESTED = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];

let state = null;

beforeEach(() => {
  const { register, flag } = new Register();
  const mmu = new MmuMock();

  state = { register, flag, mmu };
});

/* SUB
*******************************************/
describe('8 bit subtract operation', () => {
  it('subtracts value A from A', () => {
    state.register.a = 1;
    op.SUB_A.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
  });

  // generate ADD tests for B to L
  REG_NAMES_2_BE_TESTED.slice(1).forEach(name => {
    const upperName = name.toUpperCase();

    it(`subtracts value ${upperName} from A`, () => {
      state.register[name] = 1;

      state.register.a = 1;
      op[`SUB_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0);
      expect(state.flag.zero).toBe(true);
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(false);
      expect(state.flag.carry).toBe(false);

      state.register.a = 0x10;
      op[`SUB_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0x0F);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(true);
      expect(state.flag.carry).toBe(false);

      state.register.a = 0;
      op[`SUB_${upperName}`].call(null, state);
      expect(state.register.a).toBe(0xFF);
      expect(state.flag.zero).toBe(false);
      expect(state.flag.subtract).toBe(true);
      expect(state.flag.half).toBe(true);
      expect(state.flag.carry).toBe(true);
    });
  });

  it('subtracts value of address (HL) from A', () => {
    state.register.h = 0;
    state.register.l = 0;
    state.mmu.write('0', '1');

    state.register.a = 1;
    op.SUB_$HL$.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);

    state.register.a = 0x10;
    op.SUB_$HL$.call(null, state);
    expect(state.register.a).toBe(0x0F);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);

    state.register.a = 0;
    op.SUB_$HL$.call(null, state);
    expect(state.register.a).toBe(0xFF);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
  });

  it('subtracts immediate value from A', () => {
    state.register.pc = 0;
    state.mmu.write(1, 1);
    state.mmu.write(2, 1);
    state.mmu.write(3, 1);

    state.register.a = 1;
    op.SUB_d8.call(null, state);
    expect(state.register.a).toBe(0);
    expect(state.flag.zero).toBe(true);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(false);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(1);

    state.register.a = 0x10;
    op.SUB_d8.call(null, state);
    expect(state.register.a).toBe(0x0F);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(false);
    expect(state.register.pc).toBe(2);

    state.register.a = 0;
    op.SUB_d8.call(null, state);
    expect(state.register.a).toBe(0xFF);
    expect(state.flag.zero).toBe(false);
    expect(state.flag.subtract).toBe(true);
    expect(state.flag.half).toBe(true);
    expect(state.flag.carry).toBe(true);
    expect(state.register.pc).toBe(3);
  });
});
