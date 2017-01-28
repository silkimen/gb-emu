const Register = require(__base + 'cpu/register').Register;

const REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'l', 'sp', 'pc' ];

let reg = null;

describe('registers', () => {
  beforeEach(() => {
    reg = new Register();
  });

  it('are initialized with 0', () => {
    REG_NAMES.forEach(name => expect(reg.register[name]).toBe(0));
  });

  it('are representing unsigned 8 bit data', () => {
    REG_NAMES.forEach(name => {
      // max value you can represent with 8 bit
      reg.register[name] = 255;
      expect(reg.register[name]).toBe(255);

      // overflow (+1)
      reg.register[name] = 256;
      expect(reg.register[name]).toBe(0);

      // overflow (+2)
      reg.register[name] = 257;
      expect(reg.register[name]).toBe(1);
    });
  });
});

describe('flags', () => {
  beforeEach(() => {
    reg = new Register();
  });

  it('zero flag reads correctly from register F', () => {
    expect(reg.flag.zero).toBe(false);
    reg.register.f = 0b10000000;
    expect(reg.flag.zero).toBe(true);
  });

  it('subtract flag reads correctly from register F', () => {
    expect(reg.flag.subtract).toBe(false);
    reg.register.f = 0b01000000;
    expect(reg.flag.subtract).toBe(true);
  });

  it('half-carry flag reads correctly from register F', () => {
    expect(reg.flag.half).toBe(false);
    reg.register.f = 0b00100000;
    expect(reg.flag.half).toBe(true);
  });

  it('carry flag reads correctly from register F', () => {
    expect(reg.flag.carry).toBe(false);
    reg.register.f = 0b00010000;
    expect(reg.flag.carry).toBe(true);
  });

  it('zero flag updates register F correctly', () => {
    expect(reg.flag.zero).toBe(false);
    reg.flag.zero = true;
    expect(reg.register.f).toBe(0b10000000);
  });

  it('subtract flag updates register F correctly', () => {
    expect(reg.flag.subtract).toBe(false);
    reg.flag.subtract = true;
    expect(reg.register.f).toBe(0b01000000);
  });

  it('half-carry flag updates register F correctly', () => {
    expect(reg.flag.half).toBe(false);
    reg.flag.half = true;
    expect(reg.register.f).toBe(0b00100000);
  });

  it('carry flag flag updates register F correctly', () => {
    expect(reg.flag.carry).toBe(false);
    reg.flag.carry = true;
    expect(reg.register.f).toBe(0b00010000);
  });
});
