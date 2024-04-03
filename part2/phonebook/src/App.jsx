import { useState } from "react";
import Numbers from "./components/Numbers";

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: "0", number: "040 - 1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const add = (e) => {
    e.preventDefault();
    //    console.log(newName);
    const newObjeto = { name: newName, id: persons.length, number: newNumber };
    let pre = true;
    persons.map((e) => {
      //      console.log(e.name);
      if (e.name === newName) {
        console.log("nombre usado");
        pre = false;
      }
    });

    pre
      ? setPersons(persons.concat(newObjeto))
      : alert(`${newName} is already added to phonebook`);
  };
  console.log(persons.number);
  return (
    <div>
      <h2>Phonebook</h2>

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
      {persons.map((e) => (
        <Numbers name={e.name} number={e.number} key={e.id}></Numbers>
      ))}
    </div>
  );
};
export default App;
