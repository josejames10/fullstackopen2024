import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import personServices from "./services/persons";
import axios from "axios";
import Notification from "./components/Notification";

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with :
      <input onChange={handleFilter} />
    </div>
  );
};
const PersonsForm = ({
  add,
  handleNewName,
  handleNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={add}>
      <div>
        name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Persons = ({ ListPersons, handleDelete }) => {
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
  const [notification, setNotification] = useState([null]);

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
    const person = persons.filter((p) => p.name === newName);
    const newObjeto = { name: newName, number: newNumber };
    if (person.length === 0) {
      personServices.create(newObjeto).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setNotification([`se creo un nuevo usario:${newName}`, "notification"]);
        setTimeout(() => {
          setNotification([null, "notification"]);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    } else {
      if (
        window.confirm(
          `${newName} is already to phonebook, replace the old number with a new one?`
        )
      ) {
        personServices
          .upData(person[0].id, newObjeto)
          .then((Response) => {
            setPersons(
              persons.map((e) => (e.id !== person[0].id ? e : Response))
            );
            setNotification([`updated number of: ${newName}`, "notification"]);
            setTimeout(() => {
              setNotification([null, "notification"]);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setNotification([
              `Information of ${newName} has already been removed from server`,
              "error",
            ]);
            setTimeout(() => {
              setNotification([null, "error"]);
            }, 5000);
          });
      }
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((n) => id === n.id);
    if (window.confirm(`remover a ${person.name}`)) {
      console.log();
      personServices.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}></Notification>
      <Filter handleFilter={handleFilter} />
      <h3>add a new </h3>
      <PersonsForm
        add={add}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons ListPersons={filter} handleDelete={handleDelete}></Persons>
    </div>
  );
};
export default App;
