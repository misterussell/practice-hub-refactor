import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  ButtonGroup,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  ListGroup,
  ListGroupItem,
  Well,
  Panel,
} from 'react-bootstrap';

export default class ReportBuilder extends Component {
  constructor(props) {
    super(props);
    this.CSVinput = React.createRef();
    this.CSVoutput = React.createRef();
    this.state = {
      headers: null,
      headerState: null,
      uniqueIdentifier: ``,
      outputColumns: [],
    }
  }

  render() {
    return (
      <main className="converter">
        <FormGroup controlId="input-textarea" className="textarea-input">
          <ControlLabel>CSV Input</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Paste CSV data here"
            rows="10"
            inputRef={ input => this.CSVinput = input }
          />
          <HelpBlock>Paste CSV data here.</HelpBlock>
        </FormGroup>
        <ButtonGroup className="converter-buttons">
          <Button onClick={ this.getHeaders }>Grab Headers</Button>
          <Button onClick={ this.convert }>Convert</Button>
          <Button onClick={ this.clear }>Clear</Button>
        </ButtonGroup>
        <ListGroup className="headers">
          <h4 className="header-list-title">Report Columns</h4>
          {
            this.state.headers
              ?
                    this.state.headers.map((header, i) => {
                      return (
                        <ListGroupItem
                          key={ header }
                          active={ this.state.headerState[i] }
                          onClick={ () => this.updateHeaderButton(i) }
                        >
                          { header }
                        </ListGroupItem>
                      );
                    })
              : <ListGroupItem>No headers loaded.</ListGroupItem>
          }
        </ListGroup>
        <ListGroup className="subfields">
          <div className="subfield-group">
          <Well>
          <ListGroupItem className="subfield-title">Unique Identifier</ListGroupItem>
            <FormGroup controlId="unique-selector" className="subfield-option">
              <FormControl
                componentClass="select"
                value = { this.state.uniqueIdentifier }
                onChange = { this.handleUniqueIdentifier }
              >
                <option value={ `none` }>no unique identifier</option>
                {
                  this.state.headers
                    ? this.state.headers.map(header => {
                      return (
                        <option
                          key={ header }
                          value={ header }
                        >
                          { header }
                        </option>
                        )
                      })
                    : null
                }
              </FormControl>
            </FormGroup>
              <div className="subfield-description">
                {
`The unique identifier is used to compare data for duplication, lookups, and merging.

Example: If your data contains multiple lines for the same person where each line shares an email, select email as your unique identifier.

foo@bar.com, member, 78704
foo@bar.com, volunteer, 78721
                  `
                }
              </div>
            </Well>
          </div>
          <div className="subfield-group">
          <Well>
          <ListGroupItem className="subfield-title">Merge Data</ListGroupItem>
              <div className="subfield-description">
                {
`Merging allows the following functionality:

  1. Merge a single, pipe-delimited, column with different values into a pipe-delimited field.
  2. Merge multiple, comma separated, columns into a pipe-delimited field.

Merged data will be seperated by a pipe delimiter: "foo|bar"`
              }
              </div>
              <FormGroup controlId="merge-fields" className="subfield-option no-title">
                <FormControl
                  componentClass="select"
                  value = { this.state.uniqueIdentifier }
                  onChange = { this.handleMergeFields }
                >
                  {
                    this.state.headers
                      ? this.state.headers.map(header => {
                        return (
                          <option
                            key={ header }
                            value={ header }
                          >
                            { header }
                          </option>
                          )
                        })
                      : <option value={ `none` }>load headers to select</option>
                  }
                </FormControl>
                <FormControl
                  componentClass="select"
                  value = { this.state.uniqueIdentifier }
                  onChange = { this.handleMergeFields }
                >
                  {
                    this.state.headers
                      ? this.state.headers.map(header => {
                        return (
                          <option
                            key={ header }
                            value={ header }
                          >
                            { header }
                          </option>
                          )
                        })
                      : <option value={ `none` }>load headers to select</option>
                  }
                </FormControl>
              </FormGroup>
            <i class="fas fa-plus-square"></i>
            </Well>
          </div>
        </ListGroup>
      </main>
    )
  }

  handleUniqueIdentifier = (e) => {
    e.preventDefault();
    this.setState({ uniqueIdentifier: e.target.value });
  }

  handleMergeFields = (e) => {
    e.preventDefault();
    console.log('merge field handled');
  }

  clear = (e) => {
    e.preventDefault();
    this.CSVinput.value = '';
    this.setState({
      headers: null
    })
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
    const headerState = headers.map(header => false);
    this.setState({ headers, headerState });
  }

  updateHeaderButton = (headerNumber) => {
    let nextState = this.state.headerState[headerNumber] ? false : true;
    let headerState = this.state.headerState.map((currentState, i) => {
      if (i === headerNumber) {
        return nextState
      } else return currentState;
    });
    this.setState({ headerState });
  }
}

/*
<FormGroup controlId="form-controls-textarea" className="textarea-input">
  <ControlLabel>CSV Output</ControlLabel>
  <FormControl
    componentClass="textarea"
    rows="10"
    inputRef={ input => this.CSVoutput = input }
  />
  <HelpBlock>CTRL + A to select all.</HelpBlock>
</FormGroup>
*/
