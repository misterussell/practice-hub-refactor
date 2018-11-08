import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Button } from 'react-bootstrap';

export default class CSVtoJSONconverter extends Component {
  constructor(props) {
    super(props);
    this.CSVinput = React.createRef();
    this.JSONoutput = React.createRef();
    this.state = {
      json: null,
      csv: null,
    };
  }

  render() {
    return (
      <main className="converter">
        <form className="CSV">
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>CSV</ControlLabel>
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
          <Button onClick={ this.convert }>Convert</Button>
          <Button onClick={ this.clearCSV }>Clear</Button>
        </ButtonGroup>
        <form className="CSV">
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>JSON</ControlLabel>
            <FormControl
              componentClass="textarea"
              height="50vh"
              inputRef={ input => this.JSONoutput = input }
            />
            <HelpBlock>CTRL + A to select all.</HelpBlock>
          </FormGroup>
        </form>
      </main>
    )
  }

  clearCSV = (e) => {
    e.preventDefault();
    this.CSVinput.value = '';
  }

  convert = (e) => {
    e.preventDefault();
    // const json = this.props.store.rootStore.CSVJSONconverter.csvJSON(this.CSVinput.value);
    const json = this.props.store.rootStore.CSVJSONconverter.convert(this.CSVinput.value);
    this.JSONoutput.value = json;
  }
}
