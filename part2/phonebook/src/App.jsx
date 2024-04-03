import { useState } from "react";
import Numbers from "./components/Numbers";

const App = (props) => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleNewname = (e) => {
    setNewName(e.target.value);
  };

  const add = (e) => {
    e.preventDefault();
    const p = { name: newName };
    setPersons(persons.concat(p));
  };
  console.log(persons.length);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add}>
        <div>
          name: <input onChange={handleNewname} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((e) => (
        <Numbers name={e.name}></Numbers>
      ))}
    </div>
  );
};
export default App;
