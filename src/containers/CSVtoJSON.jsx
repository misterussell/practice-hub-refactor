import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class CSVtoJSONconverter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="converter">
        <form className="CSV">
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>CSV to JSON</ControlLabel>
            <FormControl
              componentClass="textarea"
              bsSize="lg"
              border="none"
              height="50vh"
              placeholder="Paste CSV data here"
            />
            <HelpBlock>All comma seperated data pasted here</HelpBlock>
          </FormGroup>
        </form>
      </main>
    )
  }
}
