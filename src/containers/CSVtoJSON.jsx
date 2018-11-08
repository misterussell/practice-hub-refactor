import React, { Component } from 'react';

class CSVtoJSONconverter extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const rootStore = this.props.store.rootStore;
    rootStore.CSVJSONconverter.convert();
  }

  render() {
    return (
      <main className="converter">
        <textarea className="CSV" resize="none"/>
      </main>
    )
  }
}

export default CSVtoJSONconverter;
