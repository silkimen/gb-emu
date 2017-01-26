const REG_NAMES = [ 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'l', 'sp', 'pc' ];
const FLAG_NAMES = [ 'zero', 'subtract', 'half', 'carry' ];
const FLAG_MASKS = [ 0x80, 0x40, 0x20, 0x10 ];

const register = {};
const flag = {};

const reset = () => Object.keys(register).forEach(key => register[key] = 0);

const getFlag = mask => (register.f & mask) > 0;

const setFlag = (value, mask) => {
  register.f = value === true ? register.f | mask : register.f & ~mask;
};

REG_NAMES.forEach(name => {
  Object.defineProperty(register, name, {
    enumerable: true,
    writable: true,
    value: 0
  });
});

FLAG_NAMES.forEach((name, index) => {
  Object.defineProperty(flag, name, {
    enumerable: true,
    writable: true,
    get: () => getFlag(FLAG_MASKS[index]),
    set: value => setFlag(value, FLAG_MASKS[index])
  });
});

export { register, flag, reset };
