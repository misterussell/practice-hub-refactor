import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default class ReportBuilder extends Component {
  constructor(props) {
    super(props);
    this.CSVinput = React.createRef();
    this.CSVoutput = React.createRef();
    this.state = {
      headers: null,
    }
  }

  render() {
    return (
      <main className="converter">
        <ButtonGroup className="converter-buttons">
          <Button onClick={ this.getHeaders }>Grab Headers</Button>
          <Button onClick={ this.convert }>Convert</Button>
          <Button onClick={ this.clear }>Clear</Button>
        </ButtonGroup>
        <div className="headers">
          {
            this.state.headers
              ? <div>headers to go here</div>
              : <div>No headers loaded.</div>
          }
        </div>
          <FormGroup controlId="form-controls-textarea" className="textarea-input">
            <ControlLabel>CSV Input</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Paste CSV data here"
              rows="10"
              inputRef={ input => this.CSVinput = input }
            />
            <HelpBlock>Paste CSV data here.</HelpBlock>
          </FormGroup>
          <FormGroup controlId="form-controls-textarea" className="textarea-input">
            <ControlLabel>CSV Output</ControlLabel>
            <FormControl
              componentClass="textarea"
              rows="10"
              inputRef={ input => this.CSVoutput = input }
            />
            <HelpBlock>CTRL + A to select all.</HelpBlock>
          </FormGroup>
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

  getHeaders = (e) => {
    e.preventDefault();
    if (this.CSVinput.value === '') {
      throw new Error('CSV empty.')
    }
    const headers = this.props.store.rootStore.CSVreport.getHeaders(this.CSVinput.value);
    console.log(headers);
  }
}
