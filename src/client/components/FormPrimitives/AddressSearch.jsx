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
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
    );

    this.autocomplete.setFields(['formatted_address']);
    this.autocomplete.setTypes(['address']);

    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.formatted_address;

    if (address) {
      console.log('inside, ', address);
      this.setState({
        query: address,
      });

      this.props.updateFun !== undefined && this.props.updateFun(address);
    }
  };

  onChange = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
    this.props.updateFun !== undefined && this.props.updateFun(value);
  };

  render() {
    let mutableProps = { ...this.props };
    if (mutableProps.updateFun !== undefined) {
      delete mutableProps.updateFun;
    }

    return (
      <div>
        <Head>
          <script src="https://maps.google.com/maps/api/js?key=AIzaSyBnw4vCWKTZgb-OMJPJ15ptB4dEa5zxQnQ&libraries=places"></script>
        </Head>
        <input
          required
          onChange={this.onChange}
          id="autocomplete"
          value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
          {...mutableProps}
        />
      </div>
    );
  }
}

export default AddressSearch;
