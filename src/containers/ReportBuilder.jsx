import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default class ReportBuilder extends Component {
  constructor(props) {
    super(props);
    this.CSVinput = React.createRef();
    this.CSVoutput = React.createRef();
  }

  render() {
    return (
      <main className="converter">
        <form className="CSV">
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>CSV Input</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Paste CSV data here"
              rows="15"
              inputRef={ input => this.CSVinput = input }
            />
            <HelpBlock>Paste CSV data here.</HelpBlock>
          </FormGroup>
        </form>
        <ButtonGroup>
          <Button onClick={ this.convert }>Convert</Button>
          <Button onClick={ this.clear }>Clear</Button>
        </ButtonGroup>
        <form className="CSV">
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>CSV Output</ControlLabel>
            <FormControl
              componentClass="textarea"
              rows="15"
              inputRef={ input => this.CSVoutput = input }
            />
            <HelpBlock>CTRL + A to select all.</HelpBlock>
          </FormGroup>
        </form>
      </main>
    )
  }

  clear = (e) => {
    e.preventDefault();
    this.CSVinput.value = '';
  }

  convert = (e) => {
    e.preventDefault();
    if (this.CSVinput.value === '') {
      throw new Error('CSV empty.')
    }
    const output = this.props.store.rootStore.CSVreport.build(this.CSVinput.value);
    this.CSVoutput.value = output;
  }


}
