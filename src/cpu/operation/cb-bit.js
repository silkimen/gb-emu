/* eslint-disable camelcase */

const registers = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];
const masks = [ 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80 ];

const BIT_factory = (mask, register) => state => {
  state.flag.half = true;
  state.flag.subtract = false;
  state.flag.zero = (state.register[register] & mask) === 0;
};

const BIT_i_$HL$_factory = mask => state => {
  state.flag.half = true;
  state.flag.subtract = false;
  state.flag.zero = (state.mmu.read(state.register.hl) & mask) === 0;
};

const operations = {};

registers.forEach(register => {
  for (let i = 0; i < 8; ++i) {
    operations[`BIT_${i}_${register}`] = BIT_factory(masks[i], register);
  }
});

for (let i = 0; i < 8; ++i) {
  operations[`BIT_${i}_$HL$`] = BIT_i_$HL$_factory(masks[i]);
}

export default operations;
