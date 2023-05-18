import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((res) => setCountries(res.data));
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);

    const c = countries.filter((x) =>
      x.name.common.toLowerCase().includes(name.toLowerCase())
    );

    setFiltered(c);
  };

  // useEffect(() => {
  //   console.log(filtered);
  // }, [name]);



  const displayDetails = (countryObj) => {
    console.log("in details", countryObj);
    const langObj = countryObj.languages;
    const keys = Object.keys(langObj);
    const langArr = [];
    for (const key of keys) {
      langArr.push(langObj[key]);
    }

    return (
      <div>
        <h2>{countryObj.name.common}</h2>
        <p>capital: {countryObj.capital[0]}</p>
        <p>area: {countryObj.area}</p>
        <h2>Languages:</h2>
        <ul>
          {langArr.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <img src={countryObj.flags.png}></img>
      </div>
    );
  };

  const displayMessage = () => {
    if (filtered.length > 20) {
      return <p>Too many matches, specify a longer name</p>;
    } else if (filtered.length === 1) {
      const countryObj = filtered[0];
      console.log("in details", countryObj);
      const langObj = countryObj.languages;
      const keys = Object.keys(langObj);
      const langArr = [];
      for (const key of keys) {
        langArr.push(langObj[key]);
      }

      return (
        <div>
          <h2>{countryObj.name.common}</h2>
          <p>capital: {countryObj.capital[0]}</p>
          <p>area: {countryObj.area}</p>
          <h2>Languages:</h2>
          <ul>
            {langArr.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
          <img src={countryObj.flags.png}></img>
          <h2>Weather in {countryObj.capital[0]}</h2>
          <p>temperature</p>
          <p>wind</p>
        </div>
      );
    } else {
      return filtered.map((x) => (
        <div>
          <p>{x.name.common}</p>
          {/* <button onClick={() => controlShow}>show</button> */}
          {/* {show ? displayDetails(x) : ''} */}
        </div>
      ));
    }
  };

  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={name} onChange={handleChange} />
      </div>
      <div>{displayMessage()}</div>
    </>
  );
}

export default App;
