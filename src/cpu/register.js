const REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'l', 'sp', 'pc' ];
const FLAG_NAMES = [ 'zero', 'subtract', 'half', 'carry' ];
const FLAG_MASKS = [ 0x80, 0x40, 0x20, 0x10 ];

export const Register = function () {
  const register = {};
  const flag = {};

  const registerBuffer = new ArrayBuffer(REG_NAMES.length);
  const registerView = new Uint8Array(registerBuffer);

  const getFlag = mask => (register.f & mask) > 0;
  const setFlag = (value, mask) => {
    register.f = value === true ? register.f | mask : register.f & ~mask;
  };

  REG_NAMES.forEach((name, index) => {
    Object.defineProperty(register, name, {
      enumerable: true,
      get: () => registerView[index],
      set: value => {
        registerView[index] = value;
      }
    });
  });

  FLAG_NAMES.forEach((name, index) => {
    Object.defineProperty(flag, name, {
      enumerable: true,
      get: () => getFlag(FLAG_MASKS[index]),
      set: value => setFlag(value, FLAG_MASKS[index])
    });
  });

  this.register = register;
  this.flag = flag;
};
