import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Button } from 'react-bootstrap';

export default class CSVtoJSONconverter extends Component {
  constructor(props) {
    super(props);
    this.CSVinput = React.createRef();
  }

  render() {
    return (
      <main className="converter">
        <form className="CSV">
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Textarea</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Paste CSV data here"
              height="50vh"
              inputRef={ input => this.CSVinput = input }
            />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
        <ButtonGroup>
          <Button>Convert</Button>
          <Button onClick={ this.clearCSV }>Clear</Button>
        </ButtonGroup>
      </main>
    );
  }

  clearCSV = (e) => {
    e.preventDefault();
    this.CSVinput.value = '';
  }
}
