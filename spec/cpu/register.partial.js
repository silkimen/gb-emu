const Register = require(`${__base}cpu/register`).Register;

const BYTE_REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'l' ];
const WORD_REG_NAMES = [ 'sp', 'pc' ];

let reg = null;

describe('register', () => {
  beforeEach(() => {
    reg = new Register();
  });

  BYTE_REG_NAMES.forEach(name => {
    it(`${name.toUpperCase()} is initialized with 0`, () => {
      expect(reg.register[name]).toBe(0);
    });
  });

  BYTE_REG_NAMES.forEach(name => {
    it(`${name.toUpperCase()} is representing unsigned 8 bit data`, () => {
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

  WORD_REG_NAMES.forEach(name => {
    it(`${name.toUpperCase()} is initialized with 0`, () => {
      expect(reg.register[name]).toBe(0);
    });
  });

  WORD_REG_NAMES.forEach(name => {
    it(`${name.toUpperCase()} is representing unsigned 16 bit data`, () => {
      // max value you can represent with 16 bit
      reg.register[name] = 65535;
      expect(reg.register[name]).toBe(65535);

      // overflow (+1)
      reg.register[name] = 65536;
      expect(reg.register[name]).toBe(0);

      // overflow (+2)
      reg.register[name] = 65537;
      expect(reg.register[name]).toBe(1);
    });
  });
});

describe('flag', () => {
  beforeEach(() => {
    reg = new Register();
  });

  it('"zero" reads correctly from register F', () => {
    expect(reg.flag.zero).toBe(false);
    reg.register.f = 0b10000000;
    expect(reg.flag.zero).toBe(true);
  });

  it('"subtract" reads correctly from register F', () => {
    expect(reg.flag.subtract).toBe(false);
    reg.register.f = 0b01000000;
    expect(reg.flag.subtract).toBe(true);
  });

  it('"half-carry" reads correctly from register F', () => {
    expect(reg.flag.half).toBe(false);
    reg.register.f = 0b00100000;
    expect(reg.flag.half).toBe(true);
  });

  it('"carry" reads correctly from register F', () => {
    expect(reg.flag.carry).toBe(false);
    reg.register.f = 0b00010000;
    expect(reg.flag.carry).toBe(true);
  });

  it('"zero" updates register F correctly', () => {
    expect(reg.flag.zero).toBe(false);
    reg.flag.zero = true;
    expect(reg.register.f).toBe(0b10000000);
  });

  it('"subtract" updates register F correctly', () => {
    expect(reg.flag.subtract).toBe(false);
    reg.flag.subtract = true;
    expect(reg.register.f).toBe(0b01000000);
  });

  it('"half-carry" updates register F correctly', () => {
    expect(reg.flag.half).toBe(false);
    reg.flag.half = true;
    expect(reg.register.f).toBe(0b00100000);
  });

  it('"carry" updates register F correctly', () => {
    expect(reg.flag.carry).toBe(false);
    reg.flag.carry = true;
    expect(reg.register.f).toBe(0b00010000);
  });
});
