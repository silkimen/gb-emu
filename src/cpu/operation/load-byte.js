/* eslint-disable camelcase */

const registers = [ 'a', 'b', 'c', 'd', 'e', 'h', 'l' ];
const operations = {};

const LD_factory = (target, source) => state => {
  state.register[target] = state.register[source];
};

const LD_$HL$_x_factory = source => state => {
  state.mmu.write(state.register.hl, state.register[source]);
};

const LD_x_$HL$_factory = target => state => {
  state.register[target] = state.mmu.read(state.register.hl);
};

const LD_x_d8_factory = target => state => {
  state.register[target] = state.mmu.read(++state.register.pc);
};

registers.forEach(source => {
  registers.forEach(target => {
    const sourceName = source.toUpperCase();
    const targetName = target.toUpperCase();

    operations[`LD_${targetName}_${sourceName}`] = LD_factory(target, source);
  });
});

registers.forEach(register => {
  const registerName = register.toUpperCase();

  operations[`LD_$HL$_${registerName}`] = LD_$HL$_x_factory(register);
  operations[`LD_${registerName}_d8`] = LD_x_d8_factory(register);
  operations[`LD_${registerName}_$HL$`] = LD_x_$HL$_factory(register);
});

operations.LD_$HL$_d8 = state => {
  const value = state.mmu.read(++state.register.pc);

  state.mmu.write(state.register.hl, value);
};

operations.LD_A_$HLI$ = state => {
  state.register.a = state.mmu.read(state.register.hl++);
};

operations.LD_A_$HLD$ = state => {
  state.register.a = state.mmu.read(state.register.hl--);
};

operations.LD_A_$BC$ = state => {
  state.register.a = state.mmu.read(state.register.bc);
};

operations.LD_A_$DE$ = state => {
  state.register.a = state.mmu.read(state.register.de);
};

operations.LDH_A_a8 = state => {
  const address = state.mmu.read(++state.register.pc) + 0xFF00;

  state.register.a = state.mmu.read(address);
};

operations.LD_A_a16 = state => {
  const address = state.mmu.read(++state.register.pc) +
    (state.mmu.read(++state.register.pc) << 8);

  state.register.a = state.mmu.read(address);
};

operations.LD_A_$C$ = state => {
  state.register.a = state.mmu.read(state.register.c + 0xFF00);
};

operations.LD_$C$_A = state => {
  state.mmu.write(state.register.c + 0xFF00, state.register.a);
};

operations.LD_$HLI$_A = state => {
  state.mmu.write(state.register.hl++, state.register.a);
};

operations.LD_$HLD$_A = state => {
  state.mmu.write(state.register.hl--, state.register.a);
};

operations.LD_$BC$_A = state => {
  state.mmu.write(state.register.bc, state.register.a);
};

operations.LD_$DE$_A = state => {
  state.mmu.write(state.register.de, state.register.a);
};

operations.LDH_a8_A = state => {
  const address = state.mmu.read(++state.register.pc) + 0xFF00;

  state.mmu.write(address, state.register.a);
};

operations.LD_a16_A = state => {
  const address = state.mmu.read(++state.register.pc) +
    (state.mmu.read(++state.register.pc) << 8);

  state.mmu.write(address, state.register.a);
};

export default operations;
