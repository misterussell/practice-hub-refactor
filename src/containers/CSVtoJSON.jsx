import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonGroup, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default class CSVtoJSONconverter extends Component {
  constructor(props) {
    super(props);
    this.CSVinput = React.createRef();
    this.JSONoutput = React.createRef();
    this.JSONinput = React.createRef();
    this.CSVoutput = React.createRef();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      toJson: true,
    };
  }

  handleChange(e) {
    const toJson = e === 2 ? false : true;
    this.setState({ toJson });
  }

  render() {
    return (
      <main className="converter">
        <ToggleButtonGroup
          type="radio"
          name="options"
          className="CSVJSON-toggle"
          value={this.state.toJson ? 1 : 2}
          onChange={this.handleChange}
        >
          <ToggleButton value={1}>CSV to JSON</ToggleButton>
          <ToggleButton value={2}>JSON to CSV</ToggleButton>
        </ToggleButtonGroup>
        <form className="CSV">
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>{ this.state.toJson ? 'CSV' : 'JSON' }</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Paste CSV data here"
              rows="15"
              inputRef={ this.state.toJson ? input => this.CSVinput = input : input => this.JSONinput = input }
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
            <ControlLabel>{ this.state.toJson ? 'JSON' : 'CSV' }</ControlLabel>
            <FormControl
              componentClass="textarea"
              rows="15"
              inputRef={ this.state.toJson ? input => this.JSONoutput = input : input => this.CSVoutput = input }
            />
            <HelpBlock>CTRL + A to select all.</HelpBlock>
          </FormGroup>
        </form>
      </main>
    );
  }

  clear = (e) => {
    e.preventDefault();
    this.state.toJson ? this.CSVinput.value = '' : this.JSONinput.value = '';
  }

  convert = (e) => {
    e.preventDefault();
    // const json = this.props.store.rootStore.CSVJSONconverter.csvJSON(this.CSVinput.value);
    const json = this.props.store.rootStore.CSVJSONconverter.convertToJson(this.CSVinput.value);
    this.JSONoutput.value = json;
  }
}
