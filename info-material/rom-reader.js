/* eslint-disable no-console */
const fs = require('fs');

fs.open('./boot.rom', 'r', (status, fd) => {
  if (status) {
    return console.log(status.message);
  }

  const buffer = new Buffer(256);

  fs.read(fd, buffer, 0, 256, 0, error => {
    if (error) {
      return console.log(error);
    }

    for (let i = 0; i < buffer.byteLength; ++i) {
      let hexAddress = i.toString(16);
      let hexValue = buffer[i].toString(16);

      while (hexAddress.length < 4) {
        hexAddress = `0${hexAddress}`;
      }

      while (hexValue.length < 2) {
        hexValue = `0${hexValue}`;
      }

      console.log(`$${hexAddress}`, hexValue);
    }
  });
});
