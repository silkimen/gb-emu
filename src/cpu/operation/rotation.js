import cbMap from './cb-map';

export const PREFIX_CB = state => {
  cbMap[state.mmu.read(++state.register.pc)].call(null, state);
};

export const RLCA = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RRCA = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RLA = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const RRA = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};
