export default class CSVJSONconverter {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  csvToArray(text) {
    let paragraph = '';
    let row = [''];
    let result = [row];
    let i = 0;
    let r = 0;
    let s = !0;
    let line;

    for (line of text) {
      if ('"' === line) {
        if (s && line === paragraph) row[i] += line;
        s = !s;
      } else if (',' === line && s) line = row[++i] = '';
      else if ('\n' === line && s) {
        if ('\r' === paragraph) row[i] = row[i].slice(0, -1);
        row = result[++r] = [line = ''];
        i = 0;
      } else row[i] += line;
      paragraph = line;
    }
    return result;
  }

  arrToObj(arr) {
    const headers = arr[0];
    const data = arr.slice(1)
    const objData = data.map((lineItem, i) => {
      const lineItemObj = {};
      lineItem.forEach((dataPoint, j) => {
        lineItemObj[headers[j]] = dataPoint;
      });
      return { lineItemObj };
    });
    return objData.map(obj => obj.lineItemObj);
  }

  convert(csv) {
    return JSON.stringify(this.arrToObj(this.csvToArray(csv)), undefined, 4);
  }
}
