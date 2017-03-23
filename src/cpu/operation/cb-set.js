/* eslint-disable camelcase */

const registers = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];
const masks = [ 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80 ];

const SET_factory = (mask, name) => state => {
  state.register[name] |= mask;
};

const SET_i_$HL$_factory = mask => state => {
  const value = state.mmu.read(state.register.hl) | mask;

  state.mmu.write(state.register.hl, value);
};

const operations = {};

registers.forEach(register => {
  for (let i = 0; i < 8; ++i) {
    operations[`SET_${i}_${register.toUpperCase()}`] = SET_factory(masks[i], register);
  }
});

for (let i = 0; i < 8; ++i) {
  operations[`SET_${i}_$HL$`] = SET_i_$HL$_factory(masks[i]);
}

export default operations;
