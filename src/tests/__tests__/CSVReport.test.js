import CSVreport from '../../models/CSVReport';

const shortCsv =
`first_name,last_name,email,postal,groups
maxwell,russell,max@misterussell.com,78741,foo
dharni,ramanathan,dramanathan@gmail.com,22222,foo|bar
maxwell,russell,max@misterussell.com,78741,bar
james,,james@gmail.com,29302,bar
LARRY,BIRD,larry@gmail.com,20193,bar
ji-liong,shu,jiji@gmail.com,11120,foo
lîsa,jolie,joliefleur@gmail.com,11123,foo|bar
beau regard,alphonse,runfast@gmail.com,33344,foo|bar
jacque,deMonde,theworld@gmail.com,111234111,foo
ahlem,deniaB,east@gmail.com,33345,foo`;

describe('The CSV report builder', () => {
  it('should have a getHeaders method that outputs an array of the headers in the CSV', () => {
    const report = new CSVreport();
    const positiveTest = ['first_name', 'last_name', 'email', 'postal', 'groups'];
    const negativeTest = ['foo', 'bar'];
    report.getHeaders(shortCsv);
    expect(report.inputHeaders.length).toBe(5);
    expect(report.inputHeaders).toEqual(positiveTest)
    expect(report.inputHeaders.length).not.toBe(2);
    expect(report.inputHeaders).not.toEqual(negativeTest);
    expect(() => {
      report.getHeaders(null);
    }).toThrow();
  });

  it('should have a saveOutput method that updates the headers class property based on an arr of str', () => {
    const report = new CSVreport();
    const positiveTest = ['first_name', 'last_name', 'email'];
    const negativeTest = ['foo', 'bar'];
    report.saveOutput(['first_name', 'last_name', 'email']);
    expect(report.outputHeaders).toEqual(positiveTest);
    expect(report.outputHeaders).not.toEqual(negativeTest)
    expect(() => {
      report.saveOutput(1);
    }).toThrow();
    expect(() => {
      report.saveOutput(null);
    });
  });

  it('should have a saveUniqueIden method that updates the uniqueIdentifier class property', () => {
    const report = new CSVreport();
    const positiveTest = ['first_name', 'last_name', 'email'];
    const negativeTest = ['foo', 'bar'];
    report.saveOutput(['first_name', 'last_name', 'email']);
    expect(report.outputHeaders).toEqual(positiveTest);
    expect(report.outputHeaders).not.toEqual(negativeTest)
    expect(() => {
      report.saveUniqueIden(1);
    }).toThrow();
    expect(() => {
      report.saveUniqueIden();
    }).toThrow();
  });

  it('should have a buildBySelection method that returns compiled data', () => {
    const report = new CSVreport();
    const selectedOutput =   report.saveOutput(['first_name', 'last_name', 'email']);

    const compiledReport = report.buildBySelection(shortCsv);
    expect(() => {
      report.buildBySelection();
    }).toThrow();
    expect(() => {
      // throws because Papa cannot read this null stream.
      // error handling in Papa.parse docs
      report.buildBySelection(123);
    }).toThrow();
    expect(compiledReport).toMatch('first_name,last_name,email');
    expect(compiledReport).toMatch('maxwell,russell,max@misterussell.com');
  });

  it('should have a clearObjKeys method that removes a parent Object key and id property and returns an array of objects', () => {
    const testObj = {
      obj1: {
        id: 'obj1',
        foo: 'bar',
        baz: 'crow',
      },
      obj2: {
        id: 'obj2',
        nerf: 'lang',
        traz: 'moo',
      },
    };
    const cleanedObj = CSVreport.clearObjKeys(testObj);
    expect(cleanedObj.length).toBe(2);
    expect(cleanedObj).toContainEqual(
      {
        foo: 'bar',
        baz: 'crow',
      },
      {
        nerf: 'lang',
        traz: 'moo',
      });
  });


});
