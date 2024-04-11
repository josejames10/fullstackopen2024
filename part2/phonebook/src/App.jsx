import { useState, useEffect } from "react";
import Contact from "./components/Contact";
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
const Persons = ({ filter }) => {
  return (
    <div>
      {filter.map((e) => (
        <Contact name={e.name} number={e.number}></Contact>
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
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setNewFilter(e.target.value);

  const filter = persons.map((e) =>
    e.name.toLowerCase().includes(newFilter.toLowerCase())
  )
    ? persons.filter((e) => e.name.toLowerCase().includes(newFilter))
    : persons;
  console.log(filter);

  const add = (event) => {
    event.preventDefault();
    let pre = true;
    persons.map((e) => {
      console.log("new name:", newName);
      if (e.name === newName) {
        pre = false;
      }
    });
    const newObjeto = { name: newName, number: newNumber };

    pre
      ? axios
          .post("http://localhost:3001/persons", newObjeto)
          .then((response) => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
          })
      : alert(`${newName} is already added to phonebook`);
  };
  console.log(persons);

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
      <Persons filter={filter}></Persons>
    </div>
  );
};
export default App;
