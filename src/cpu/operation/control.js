export const PREFIX_CB = () => {
  // not called actually
};

export const INVALID = () => {
  // something really went wrong
};

export const NOOP = () => {
  // it's a no-op
};

export const STOP = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const HALT = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const DI = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};

export const EI = state => {
  throw new Error('NOT_IMPLEMENTED', state);
};
