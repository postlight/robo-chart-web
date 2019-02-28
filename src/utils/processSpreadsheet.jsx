const processSpreadsheet = values => {
  const processedData = {
    data: [],
    start: '',
    end: '',
  };
  let rowstart = -1;
  let colstart = 999999999;
  let colend = -1;
  values.forEach((element, rowindex) => {
    if (element.length > 0) {
      if (rowstart < 0) {
        rowstart = rowindex + 1;
      }
      let done = false;
      const elements = [];
      element.forEach((value, colindex) => {
        const trimmedValue = value.trim();
        if (!done) {
          if (trimmedValue.length > 0) {
            elements.push(trimmedValue);
            if (colindex < colstart) {
              colstart = colindex;
            }
            if (colindex > colend) {
              colend = colindex;
            }
          } else if (elements.length > 0) {
            done = true;
          }
        }
      });
      processedData.data.push(elements);
    }
  });

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  const rowend = rowstart + processedData.data.length - 1;
  const gridStart = alphabet[colstart] + rowstart;
  const gridend = alphabet[colend] + rowend;
  processedData.start = gridStart;
  processedData.end = gridend;

  return processedData;
};

export { processSpreadsheet };
