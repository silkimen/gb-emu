const memory = [];

export const read = address => (memory[address] & 0xFF) || 0;

export const write = (address, value) => {
  memory[address] = value & 0xFF;
};
