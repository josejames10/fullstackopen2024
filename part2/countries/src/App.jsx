import { useEffect, useState } from "react";
import axios from "axios";
const Content = ({ filter,handleShow }) => {
  const fl = filter.length;
  if (fl >= 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (fl === 1) {
    return <Pais pais={filter[0]}></Pais>;
  }
  return (
    <>
      {filter.map((filter, index) => (
        <Paises name={filter.name.common} key={index} handleShow={handleShow} pais={filter}></Paises>
      ))}
    </>
  );
};
const Paises = ({ name,handleShow,pais }) => {
  return (
  <div>{name}<button onClick={()=>handleShow(pais)}>show</button></div>
)
};
const Pais = ({ pais }) => {
  const languages = Object.keys(pais.languages);
    return (
    <div>
      <h1>{pais.name.common}</h1>
      capital: {pais.capital}
      <br />
      area: {pais.area}
      <h2>languages</h2>
      <ul>
        {languages.map(l=><li key={l}>{pais.languages[l]}</li>)}
      </ul>
      <img src={pais.flags.png} ></img>
    </div>
  );
};
function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [show , setshow] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((reponse) => {
        setCountries(reponse.data);
      });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleShow = (p) => {
    setshow(<Pais pais={p}></Pais>)
    setTimeout(() => {
      setshow(null)
    }, 5000);
  };
  const onSearch = (event) => {
    event.preventDefault();
  };

  const filter = countries.filter((e) => {
    if (value === "") {
      e = "";
    } else if (e.name.common.toLowerCase().includes(value.toLowerCase()))
      return e;
  });

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      {show}
      <Content filter={filter} handleShow={handleShow}></Content>
    </div>
  );
}

export default App;
