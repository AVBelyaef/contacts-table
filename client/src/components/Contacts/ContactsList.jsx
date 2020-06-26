import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchContacts,
  fetchRemoveContact,
  fetchUpdateContact,
} from '../../redux/actions/contactAC';

import Spinner from '../Spinner/Spinner';
import NewContact from '../NewContact/NewContact';
import Search from '../SearchContact/SearchContact';
import TableRow from './TableRow';

class ContactsList extends PureComponent {
  componentDidMount() {
    const { requestContacts } = this.props;
    requestContacts();
  }

  onDeleted = (id) => {
    const { removeContact } = this.props;
    removeContact(id);
  };

  searchContacts = (contacts, search) => (
    contacts.filter((contact) => contact.name.toLowerCase().includes(search))
  );

  render() {
    const {
      search, loading, error, contacts, fetchUpdateContacts,
    } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return (<p className="red center-align">{error}</p>);
    }
    return (
      <>
        <table className="highlight centered ">
          <thead>
            <tr>
              <th aria-label="search"><Search /></th>
              <th>Телефон</th>
              <th>Почта</th>
              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {contacts
            && this.searchContacts(contacts, search) > -1 ? (
              <tr>
                <th>Контакт не найден</th>
              </tr>
              ) : (
                this.searchContacts(contacts, search).map(
                  (contact) => (
                    <TableRow
                      key={contact.id}
                      contact={contact}
                      onDeleted={this.onDeleted}
                      fetchUpdateContact={fetchUpdateContacts}
                    />
                  ),
                )
              )}
          </tbody>
        </table>
        <NewContact />
      </>
    );
  }
}
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  requestContacts: PropTypes.func.isRequired,
  removeContact: PropTypes.func.isRequired,
  fetchUpdateContacts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  loading: state.contacts.loading,
  error: state.contacts.errorContacts,
  search: state.contacts.search,
});

const mapDispatchToProps = (dispatch) => ({
  requestContacts: () => dispatch(fetchContacts()),
  removeContact: (id) => dispatch(fetchRemoveContact(id)),
  fetchUpdateContacts: (contact) => dispatch(fetchUpdateContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
