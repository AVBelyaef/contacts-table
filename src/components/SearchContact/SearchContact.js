import React, { Component } from 'react';
import { connect } from 'react-redux';

import { searchContact } from '../../redux/actions'

class SearchContact extends Component {
  state = {
    value: '',
  };

  onTermChange = (e) => {
    const value = e.target.value;
    this.setState({value});
    this.props.onSearchChange(value.toLowerCase());
  }

  render() {
    return (
      <input
        type="search"
        placeholder="поиск"
        value={this.state.value}
        onChange={this.onTermChange}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: value => dispatch(searchContact(value))
  }
}

export default connect(null, mapDispatchToProps)(SearchContact);
