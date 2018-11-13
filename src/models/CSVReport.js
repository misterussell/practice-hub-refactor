export default class CSVReport {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  build(data) {
    const parsedData = JSON.parse(data);
    let output = {};

    parsedData.forEach((datapoint, i) => {
      const uniqueIdentifier = datapoint['email'];
      if (!output[uniqueIdentifier]) {
        output[uniqueIdentifier] = {
          email: datapoint.email,
          first_name: datapoint.first_name,
          last_name: datapoint.last_name,
          postal_code: datapoint.postal,
          groups: datapoint.groups.split('|'),
        };
      } else {
        const newGroups = datapoint.groups.split('|').filter(group => !output[uniqueIdentifier].groups.includes[group]);
        output[uniqueIdentifier].groups = [...output[uniqueIdentifier].groups, ...newGroups];
      }
    });

    console.log(output);
    return Object.values(output).map((datapoint) => {
      return {
        email: datapoint.email,
        first_name: datapoint.first_name,
        last_name: datapoint.last_name,
        postal_code: datapoint.postal_code,
        groups: datapoint.groups.join('|'),
      };
    });
  }

  jsonToCsv(json) {
    const replacer = (key, val) => val === null ? '' : val;
    const header = Object.keys(json[0]);
    const csvData = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csvData.unshift(header.join(','));
    csvData.join('\r\n');
    return csvData.join('\r\n');
  }
}
