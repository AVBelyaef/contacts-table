import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TableRow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      name: '',
      phone: '',
      email: '',
    };
  }

  componentDidMount() {
    const { contact: { name, phone, email } } = this.props;
    this.setState({
      name,
      phone,
      email,
    });
  }

  handleClick = () => {
    const { clicked } = this.state;
    this.setState((prevState) => ({ ...prevState, clicked: !clicked }));
  };

  onChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { name, phone, email } = this.state;
    const { contact: { id }, fetchUpdateContact } = this.props;
    fetchUpdateContact({
      name,
      phone,
      email,
      id,
    });
  };

  render() {
    const { contact: { id }, onDeleted } = this.props;
    const {
      name, phone, email, clicked,
    } = this.state;
    return (
      <>
        <tr>
          { clicked ? (
            <>
              <td>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChangeInput}
                />
              </td>
              <td>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{11}"
                  placeholder="Формат номера 8XXXXXXXXXX"
                  value={phone}
                  onChange={this.onChangeInput}
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.onChangeInput}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="waves-effect btn red btn-floating btn-small"
                  style={{ marginRight: '10px' }}
                  onClick={this.handleClick}
                >
                  <i className="material-icons">close</i>
                </button>
                <button
                  type="button"
                  className="waves-effect waves-light btn-floating pulse btn-small"
                  onClick={this.handleSubmit}
                >
                  <i className="material-icons ">check</i>
                </button>
              </td>
            </>
          ) : (
            <>
              <td>{name}</td>
              <td>{phone}</td>
              <td>{email}</td>
              <td>
                <button
                  type="button"
                  className="waves-effect waves-light btn-floating btn-small"
                  style={{ marginRight: '10px' }}
                  onClick={this.handleClick}
                >
                  <i className="material-icons">edit</i>
                </button>
                <button
                  type="button"
                  className="waves-effect btn red btn-floating btn-small"
                  onClick={() => onDeleted(id)}
                >
                  <i className="material-icons">delete_forever</i>
                </button>
              </td>
            </>
          )}
        </tr>
      </>
    );
  }
}
TableRow.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  fetchUpdateContact: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default TableRow;
