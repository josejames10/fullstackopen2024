import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import personServices from "./services/persons";
import axios from "axios";

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with :
      <input onChange={handleFilter} />
    </div>
  );
};
const PersonsForm = ({ add, handleNewName, handleNewNumber }) => {
  return (
    <form onSubmit={add}>
      <div>
        name: <input onChange={handleNewName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Persons = ({ ListPersons, handleDelete}) => {
  return (
    <div>
      {ListPersons.map((e) => (
        <Contact
          name={e.name}
          number={e.number}
          key={e.id}
          id={e.id}
          handleDelete={handleDelete}
        ></Contact>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setNewFilter(e.target.value);

  const filter = persons.map((e) => {
    e.name.toLowerCase().includes(newFilter.toLowerCase());
  })
    ? persons.filter((e) => e.name.toLowerCase().includes(newFilter))
    : persons;

  const add = (event) => {
    event.preventDefault();
    let pre = true;
    persons.map((e) => {
      if (e.name === newName) {
        pre = false;
      }
    });
    const newObjeto = { name: newName, number: newNumber };

    pre
      ? personServices.create(newObjeto).then((returnedNote) => {
          setPersons(persons.concat(returnedNote));
          setNewName('');
          setNewNumber('');  
        })
      : alert(`${newName} is already added to phonebook`);
  };

  const handleDelete = (id) => {
    const person = persons.find(n => id===n.id ) 
    if (window.confirm(`remover a ${person.name}`)) {
      personServices
        .remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>add a new </h3>
      <PersonsForm
        add={add}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons ListPersons={filter} handleDelete={handleDelete}></Persons>
    </div>
  );
};
export default App;
