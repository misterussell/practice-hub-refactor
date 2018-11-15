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
                <option value={ `none`}>no unique identifier</option>
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
`The unique identifier allows you to check data for duplication, and merge fields together.

Example: If your data contains multiple lines for the same person where each line shares an email, select email as your unique identifier.
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
`Merging allows you to combine multiple of columns of data.

Data will be seperated by a pipe delimiter.

Example: If more than one column are better suited in a single column, select the columns to merge here.`
                }
              </div>
              <FormGroup controlId="unique-selector" className="subfield-option">
                <FormControl
                  componentClass="select"
                  value = { this.state.uniqueIdentifier }
                  onChange = { this.handleUniqueIdentifier }
                >
                  <option value={ `none`}>load headers to select</option>
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
