import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import './NewContact.css';

import { fetchAddContact } from '../../redux/actions/contactAC';

class NewContact extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
    };
  }

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
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { name, phone, email } = this.state;
    const { addContact } = this.props;
    addContact({
      name,
      phone,
      email,
    });
    this.setState({
      name: '',
      phone: '',
      email: '',
    });
    const instance = M.Modal.getInstance(this.Modal);
    instance.close();
  };

  render() {
    const { name, phone, email } = this.state;
    return (
      <div>
        <button
          type="button"
          className="waves-effect waves-light btn modal-trigger btn-new-contact"
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
                  value={name}
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
                  value={phone}
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
                  value={email}
                  onChange={this.onChangeInput}
                  required
                />
                <label htmlFor="email">Электронная почта</label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-close waves-effect waves-red btn-flat">
              Отмена
            </button>
            <button
              className="waves-effect waves-green btn-flat"
              type="submit"
              onClick={this.handleSubmit}
              disabled={
                !name || !email || !phone
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

NewContact.propTypes = {
  addContact: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addContact: (contact) => dispatch(fetchAddContact(contact)),
});

export default connect(undefined, mapDispatchToProps)(NewContact);
