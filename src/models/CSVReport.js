import Papa from 'papaparse';

export default class CSVReport {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  inputHeaders = [];
  outputHeaders = [];
  uniqueIdentifier = null;

  // build this so that there are selectable columns allowing for the user to
  // build the report they'd like to
  build(csv) {
    const parsedCsv = Papa.parse(csv, { header: true });
    const output = {};

    parsedCsv.data.forEach((datapoint, i) => {
      const uniqueIdentifier = datapoint.email;
      const first = this.checkName(datapoint.first_name) === null ?
        this.fixName(datapoint.first_name)
        : datapoint.first_name;
      const last = this.checkName(datapoint.last_name) === null ?
        this.fixName(datapoint.last_name)
        : datapoint.last_name;
      if (!output[uniqueIdentifier]) {
        output[uniqueIdentifier] = {
          email: datapoint.email,
          first_name: first,
          last_name: last,
          postal_code: datapoint.postal,
          groups: datapoint.groups.split('|'),
          'check_first?': this.checkName(datapoint.first_name),
          'check_last?': this.checkName(datapoint.last_name),
          'check_postal?': this.checkPostal(datapoint.postal),
        };
      } else {
        const newGroups = datapoint.groups.split('|').filter(group => !output[uniqueIdentifier].groups.includes[group]);
        output[uniqueIdentifier].groups = [...output[uniqueIdentifier].groups, ...newGroups];
      }
    });

    return Papa.unparse(Object.values(output).map((datapoint) => {
      return {
        email: datapoint.email,
        first_name: datapoint.first_name,
        last_name: datapoint.last_name,
        postal_code: datapoint.postal_code,
        groups: datapoint.groups.join('|'),
        'check_first?': datapoint['check_first?'],
        'check_last?': datapoint['check_last?'],
        'check_postal?': datapoint['check_postal?'],
      };
    }));
  }

  checkName(str) {
    const nonAlphas = /\W/;
    const camelCase = /([A-Z][a-z])|([a-z][A-Z])/;
    // hande empty str
    if (str === '') {
      return true;
    // handle non alpha including spaces
    } else if (nonAlphas.test(str.slice(1))) {
      return true;
    // handle camel case
    } else if (camelCase.test(str.slice(1))) {
      return true;
    }
    return null;
  }

  fixName(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  checkPostal(code) {
    const postalRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    if (!postalRegex.test(code.toString())) {
      return true;
    }
    return null;
  }

  getHeaders(csv) {
    if (!csv) {
      throw new Error('No data provided to parse for headers.');
    } this.inputHeaders = csv.split('\n')[0].split(',');
  }

  saveOutput(headers) {
    if (!headers) {
      throw new Error('No headers provided to save to class instance of CSVReport.');
    } else if (!Array.isArray(headers)) {
      throw new Error('Headers provided not an array.');
    } this.outputHeaders = headers;
  }

  saveUniqueIden(id) {
    if (!id) {
      throw new Error('No unique identifier to save to class instance of CSVReport.');
    } else if (typeof id !== 'string') {
      throw new Error('Unique identifier must be a header string.');
    } this.uniqueIdentifier = id;
  }

  buildBySelection(csv) {
    if (!csv) {
      throw new Error('No CSV data provided to parse.')
    } else {
      const parsedCSV = Papa.parse(csv, { header: true });
      const output = {};

      if (parsedCSV.errors.length > 0) {
        console.log(parsedCSV.errors);
        throw new Error('Errors parsing CSV data. Please see console for data.');
      } else {
        console.log(parsedCSV);
        parsedCSV.data.forEach((datapoint, i) => {
          const id = 15486047 * i;
          if (!output[this.uniqueIdentifier]) {
            output[id] = {
              id,
            };
          }
        });
      }
    }
  }
}
