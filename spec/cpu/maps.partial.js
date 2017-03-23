const instrMap = require(`${__base}cpu/instruction-map`).default;
const cbMap = require(`${__base}cpu/cb-map`).default;

const maps = [ instrMap, cbMap ];
const names = [ 'instruction map', 'CB map' ];

maps.forEach((map, index) => {
  describe(names[index], () => {
    for (let i = 0; i < 0xFF; ++i) {
      const hexVal = `0x${i.toString(16).toUpperCase()}`;

      it(`maps ${hexVal} to implementation`, () => {
        expect(typeof map[i]).toBe('function');
      });
    }
  });
});
