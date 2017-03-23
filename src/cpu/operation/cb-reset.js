/* eslint-disable camelcase */

const registers = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];
const masks = [ 0xFE, 0xFD, 0xFB, 0xF7, 0xEF, 0xDF, 0xBF, 0x7F ];

const RES_factory = (mask, name) => state => {
  state.register[name] &= mask;
};

const RES_i_$HL$_factory = mask => state => {
  const value = state.mmu.read(state.register.hl) & mask;

  state.mmu.write(state.register.hl, value);
};

const operations = {};

registers.forEach(register => {
  for (let i = 0; i < 8; ++i) {
    operations[`RES_${i}_${register}`] = RES_factory(masks[i], register);
  }
});

for (let i = 0; i < 8; ++i) {
  operations[`RES_${i}_$HL$`] = RES_i_$HL$_factory(masks[i]);
}

export default operations;
