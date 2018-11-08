export default class CSVJSONconverter {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  csvJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i += 1) {
      const output = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j += 1) {
        output[headers[j]] = currentline[j];
      }

      result.push(output);
    }

    return JSON.stringify(result);
  }
}
