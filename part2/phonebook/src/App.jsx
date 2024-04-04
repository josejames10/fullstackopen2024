import { useState } from "react";
import Numbers from "./components/Contact";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 0 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 1 },
    { name: "Dan Abramov", number: "12-43-234345", id: 2 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 3 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setNewFilter(e.target.value);

  const filter = persons.map((e) =>
    e.name.toLowerCase().includes(newFilter.toLowerCase())
  )
    ? persons.filter((e) => e.name.toLowerCase().includes(newFilter))
    : persons;
  console.log(filter);

  const add = (e) => {
    e.preventDefault();
    const newObjeto = { name: newName, id: persons.length, number: newNumber };
    let pre = true;
    persons.map((e) => {
      if (e.name === newName) {
        console.log("nombre usado");
        pre = false;
      }
    });

    pre
      ? setPersons(persons.concat(newObjeto))
      : alert(`${newName} is already added to phonebook`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter : <input onChange={handleFilter} />
      <h3>add a new </h3>
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
      <h2>Numbers</h2>
      {filter.map((e) => (
        <Numbers name={e.name} number={e.number} key={e.id}></Numbers>
      ))}
    </div>
  );
};
export default App;
