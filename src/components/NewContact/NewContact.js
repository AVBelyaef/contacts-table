import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { fetchAddContact } from '../../redux/actions';

class NewContact extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
  };

  componentDidMount() {
    M.updateTextFields();
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: '4%',
      endingTop: '10%',
    };
    M.Modal.init(this.Modal, options);
  }

  onChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.addContact({
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
    });
    this.setState({
      name: '',
      phone: '',
      email: '',
    });
    let instance = M.Modal.getInstance(this.Modal);
    instance.close();
  };

  render() {
    return (
      <div>
        <button
          className="waves-effect waves-light btn modal-trigger"
          style={{ marginTop: '20px' }}
          data-target="modal1"
        >
          Новый контакт
        </button>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <h4>Новый контакт</h4>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="validate"
                  value={this.state.name}
                  onChange={this.onChangeInput}
                  required
                />
                <label htmlFor="name">Имя</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 ">
                <input
                  id="tel"
                  type="tel"
                  name="phone"
                  className="validate "
                  value={this.state.phone}
                  onChange={this.onChangeInput}
                  pattern="[0-9]{11}"
                  placeholder="Формат номера 8XXXXXXXXXX"
                  required
                />
                <label htmlFor="tel">Телефон</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.onChangeInput}
                  required
                />
                <label htmlFor="email">Электронная почта</label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="modal-close waves-effect waves-red btn-flat">
              Отмена
            </button>
            <button
              className="waves-effect waves-green btn-flat"
              type="submit"
              onClick={this.handleSubmit}
              disabled={
                !this.state.name || !this.state.email || !this.state.phone
              }
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch(fetchAddContact(contact)),
  };
};

export default connect(null, mapDispatchToProps)(NewContact);
