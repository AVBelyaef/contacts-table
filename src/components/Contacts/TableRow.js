import React, { Component } from 'react';

class TableRow extends Component {
  state = {
    clicked: false,
    name: '',
    phone: '',
    email: '',
  };
  componentDidMount() {
    const { name, phone, email } = this.props.contact;
    this.setState({
      name,
      phone,
      email,
    });
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  onChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { name, phone, email } = this.state;
    this.props.fetchUpdateContact({
      name,
      phone,
      email,
      id: this.props.contact.id,
    });
  };

  render() {
    const { contact, onDeleted } = this.props;
    return (
      <>
        <tr>
          {this.state.clicked ? (
            <>
              <td>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeInput}
                />
              </td>
              <td>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{11}"
                  placeholder="Формат номера 8XXXXXXXXXX"
                  value={this.state.phone}
                  onChange={this.onChangeInput}
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeInput}
                />
              </td>
              <td>
                <button
                  className="waves-effect btn red btn-floating btn-small"
                  style={{marginRight: "10px"}}
                  onClick={this.handleClick}
                >
                  <i className="material-icons">close</i>
                </button>
                <button
                  className="waves-effect waves-light btn-floating pulse btn-small"
                  onClick={this.handleSubmit}
                >
                  <i className="material-icons ">check</i>
                </button>
              </td>
            </>
          ) : (
            <>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>
                <button
                  className="waves-effect waves-light btn-floating btn-small"
                  style={{marginRight: "10px"}}
                  onClick={this.handleClick}
                >
                  <i className="material-icons">edit</i>
                </button>
                <button
                  className="waves-effect btn red btn-floating btn-small"
                  onClick={() => onDeleted(contact.id)}
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

export default TableRow;
