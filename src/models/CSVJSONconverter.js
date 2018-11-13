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

  convertToJson(csv) {
    return JSON.stringify(this.arrToObj(this.csvToArray(csv)), undefined, 4);
  }

  jsonToCsv(json) {
    const replacer = (key, val) => val === null ? '' : val;
    const header = Object.keys(json[0]);
    const csvData = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csvData.unshift(header.join(','));
    csvData.join('\r\n');
    return csvData.join('\r\n');
  }

  convert(csv) {
    const csvArray = this.csvToArray(csv);
    const csvObj = this.arrToObj(csvArray);
    return this.jsonToCsv(csvObj);
  }
}
