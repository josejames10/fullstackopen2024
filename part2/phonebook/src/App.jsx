import { useState } from "react";
import Numbers from "./components/Numbers";

const App = (props) => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: "0" }]);
  const [newName, setNewName] = useState("");
  const handleNewname = (e) => {
    setNewName(e.target.value);
  };

  const add = (e) => {
    e.preventDefault();
  //  console.log(newName);
    const newObjeto = { name: newName, id: persons.length };
    let pre = true;
    persons.map((e) => {
//      console.log(e.name);
      if (e.name === newName) {
        console.log("nombre usado");
        pre = false;
      }
    });
    console.log(pre);
    pre
      ? setPersons(persons.concat(newObjeto))
      : alert(`${newName} is already added to phonebook`);
  };

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
        <Numbers name={e.name} key={e.id}></Numbers>
      ))}
    </div>
  );
};
export default App;
