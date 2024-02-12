import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../contact-form/ContactForm';
import { ContactList } from '../contact-list/ContactList';
import { Filter } from '../filter/Filter';
import { useContact } from 'components/contact-context/ContactContext';
import css from './App.module.css';

const App = () => {
  const { updateFilter, updateContacts, contacts, filter } = useContact();

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements[0].value;
    const number = e.currentTarget.elements[1].value;
    if (
      contacts.some(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(name + 'is already in contacts');
      return;
    }

    updateContacts([
      ...contacts,
      {
        id: nanoid(),
        name,
        number,
      },
    ]);
    e.currentTarget.reset();
  };

  const getDataStorage = () => {
    return localStorage.getItem('contacts');
  };

  useEffect(() => {
    const data = getDataStorage();
    if (data) {
      updateContacts(JSON.parse(data));
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => {
    const data = getDataStorage();
    if (filter)
      return contacts.filter(contact =>
        contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
    else if (data) return JSON.parse(data);
    else return contacts;
  };

  const handleClick = e => {
    const list = contacts.filter(contact => contact.id !== e.currentTarget.id);
    updateContacts(list);
  };

  const handleChange = e => {
    const valueImput = e.currentTarget.value.trim();
    updateFilter(valueImput);
  };

  return (
    <div className={css.div_container}>
      <h1>Phonebook</h1>
      <ContactForm onHandlesubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onHandleChange={handleChange} />
      <ContactList list={getList()} onHandleClick={handleClick} />
    </div>
  );
};

export { App };
