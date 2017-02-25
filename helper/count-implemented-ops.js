const count = operationsMap => {
  const implArray = Object.keys(operationsMap)
    .map(key => {
      let implemented = true;

      try {
        operationsMap[key]();
      } catch (error) {
        if (error.message === 'NOT_IMPLEMENTED') {
          implemented = false;
        }
      }

      return implemented;
    });

  const implemented = implArray.reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
  const pending = implArray.length - implemented;

  return {
    total: implArray.length,
    implemented,
    pending
  };
};

module.exports = count;
