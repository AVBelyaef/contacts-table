import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

import { searchContact } from '../../redux/actions/contactAC';

class SearchContact extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onTermChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    const { onSearchChange } = this.props;
    onSearchChange(value.toLowerCase());
  };

  render() {
    const { value } = this.state;
    return (
      <input
        type="search"
        placeholder="поиск"
        value={value}
        onChange={this.onTermChange}
      />
    );
  }
}
SearchContact.propTypes = {
  onSearchChange: PropType.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (value) => dispatch(searchContact(value)),
});

export default connect(undefined, mapDispatchToProps)(SearchContact);
