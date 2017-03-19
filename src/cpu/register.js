const BYTE_REGISTER_NAMES = [ 'b', 'c', 'd', 'e', 'h', 'l', 'a', 'f' ];
const BYTE_REGISTER_GROUPS = [ 'bc', 'de', 'hl' ];
const WORD_REGISTER_NAMES = [ 'sp', 'pc' ];
const FLAG_NAMES = [ 'zero', 'subtract', 'half', 'carry' ];
const FLAG_MASKS = [ 0x80, 0x40, 0x20, 0x10 ];

export const Register = function () {
  const register = {};
  const flag = {};

  const byteBuffer = new ArrayBuffer(BYTE_REGISTER_NAMES.length);
  const byteView = new Uint8Array(byteBuffer);
  const groupView = new DataView(byteBuffer);

  const wordBuffer = new ArrayBuffer(WORD_REGISTER_NAMES.length * 2);
  const wordView = new Uint16Array(wordBuffer);

  const getFlag = mask => (register.f & mask) > 0;
  const setFlag = (value, mask) => {
    register.f = value === true ? register.f | mask : register.f & ~mask;
  };

  BYTE_REGISTER_NAMES.forEach((name, index) => {
    Object.defineProperty(register, name, {
      enumerable: true,
      get: () => byteView[index],
      set: value => {
        byteView[index] = value;
      }
    });
  });

  BYTE_REGISTER_GROUPS.forEach((group, index) => {
    Object.defineProperty(register, group, {
      enumerable: true,
      get: () => groupView.getUint16(index * 2, false),
      set: value => {
        groupView.setUint16(index * 2, value, false);
      }
    });
  });

  WORD_REGISTER_NAMES.forEach((name, index) => {
    Object.defineProperty(register, name, {
      enumerable: true,
      get: () => wordView[index],
      set: value => {
        wordView[index] = value;
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
