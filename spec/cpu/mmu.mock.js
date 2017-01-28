const MmuMock = function() {
  const memory = new Uint8Array(new ArrayBuffer(0xFFFF));

  this.read = address => memory[address];
  this.write = (address, value) => memory[address] = value;
};

module.exports = MmuMock;
