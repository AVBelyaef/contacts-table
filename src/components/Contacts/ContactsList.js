import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchContacts,
  fetchRemoveContact,
  fetchUpdateContact,
} from '../../redux/actions';

import Spinner from '../Spinner/Spinner';
import NewContact from '../NewContact/NewContact';
import Search from '../SearchContact/SearchContact';
import TableRow from './TableRow';

class ContactsList extends Component {
  componentDidMount() {
    this.props.requestContacts();
  }

  onDeleted = (id) => {
    this.props.removeContact(id);
  };

  onUpdate = (contact) => {
    console.log();
  };

  searchContacts = (contacts, search) => {
    if (search.length === 0) {
      return contacts;
    }
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().indexOf(search) > -1;
    });
  };

  render() {
    const { search } = this.props;
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : this.props.error ? (
          <p className="red center-align">{this.props.error}</p>
        ) : (
          <>
            <table className="highlight centered ">
              <thead>
                <tr>
                  <th>{<Search />}</th>
                  <th>Телефон</th>
                  <th>Почта</th>
                  <th>Действия</th>
                </tr>
              </thead>

              <tbody>
                {this.props.contacts &&
                this.searchContacts(this.props.contacts, search) > -1 ? (
                  <tr>
                    <th>Контакт не найден</th>
                  </tr>
                ) : (
                  this.searchContacts(this.props.contacts, search).map(
                    (contact) => {
                      return (
                        <TableRow
                          key={contact.id}
                          contact={contact}
                          onDeleted={this.onDeleted}
                          fetchUpdateContact={this.props.fetchUpdateContact}
                        />
                      );
                    }
                  )
                )}
              </tbody>
            </table>
            <NewContact />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.contacts,
    loading: state.contacts.loading,
    error: state.contacts.errorContacts,
    search: state.contacts.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestContacts: () => dispatch(fetchContacts()),
    removeContact: (id) => dispatch(fetchRemoveContact(id)),
    fetchUpdateContact: (contact) => dispatch(fetchUpdateContact(contact)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
