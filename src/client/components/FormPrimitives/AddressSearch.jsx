import React, { Component } from 'react';
import Head from 'next/head';

class AddressSearch extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      query: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.handleScriptLoad();
  }

  handleScriptLoad = () => {
    // Initialize Google Autocomplete
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById(this.props.id));

    this.autocomplete.setFields(['formatted_address']);
    this.autocomplete.setTypes(['address']);

    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.formatted_address;

    if (address) {
      this.setState({
        query: address,
      });

      this.props.onChangeInput !== undefined && this.props.onChangeInput(address);
    }
  };

  onChange = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
    this.props.onChangeInput !== undefined && this.props.onChangeInput(value);
  };

  render() {
    const { onChangeInput, ...elementProps } = this.props;

    return (
      <div>
        <input
          required
          onChange={this.onChange}
          value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
          {...elementProps}
        />
      </div>
    );
  }
}

export default AddressSearch;
