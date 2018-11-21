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

import { MergeSelector } from '../components';

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
      mergeToField: ``,
      mergeFromField: ``,
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
        <div className="report-tools">
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

        email,roles,zip_code
        foo@bar.com,member,78704
        foo@bar.com,volunteer,78704
          >>  >>
        email,roles,zip_code
        foo@bar.com,member|volunteer,78704

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

    1. Merge a single pipe-delimited field into anoter pipe-delimited field.
    2. Merge comma separated fields into a pipe-delimited field.

    - Merged data will be seperated by a pipe delimiter: "foo|bar"
    - Duplicate entries can be removed if desired

        email,fav_movie_1,fav_movie_2,ticket_holder
        foo@bar.com,dune,blade runner,false
          >>  >>
        email,fav_movie_1,ticket_holder
        foo@bar.com,dune|blade runner,false
        `
                }
                </div>
                <Panel bsStyle="info">
                  <Panel.Heading>
                    <Panel.Title componentClass="h5">
                      Select Fields to Merge
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <MergeSelector
                      headers={ this.state.headers }
                      mergeToField={ this.state.mergeToField }
                      mergeFromField={ this.state.mergeFromField }
                      callback={ this.handleMergeFields }
                    />
                  <i className="fas fa-plus-square"></i>
                </Panel.Body>
              </Panel>
              </Well>
            </div>
          </ListGroup>
        </div>
      </main>
    )
  }

  handleUniqueIdentifier = (e) => {
    e.preventDefault();
    this.setState({ uniqueIdentifier: e.target.value });
  }

  handleMergeFields = (e) => {
    console.log(e);
    console.log('merge field handled');

    this.setState({ [e[0]]: e[1]} )
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
    this.props.store.rootStore.CSVreport.getHeaders(this.CSVinput.value);
    const headers = this.props.store.rootStore.CSVreport.inputHeaders;
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
