import CSVreport from '../../models/CSVreport';

describe('The CSV report builder', () => {
  it('should have a getHeaders function that outputs an array of the headers in the CSV', () => {
    const csv = `first_name,last_name,email,postal,groups
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
    const headers = CSVreport.getHeaders(csv);
    expect(headers.length).toEqual(5);
    expect(() => {
      CSVreport.getHeaders(null);
    }).toThrow();
  });
});
