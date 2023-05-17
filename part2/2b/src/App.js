import { useState } from "react";

const Filter = ({ handleFilterChange }) => {
  return (
    <>
      filter results to include:
      <input onChange={handleFilterChange} />
    </>
  );
};

const Form = ({ addPerson, handleInputChange, formData }) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            value={formData.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>
        <div>
          number:{" "}
          <input
            value={formData.number}
            onChange={handleInputChange}
            name="number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const People = ({ filterBy, persons }) => {
  return (
    <>
      <ul>
        {filterBy
          ? persons
              .filter((x) => x.name.toLowerCase() === filterBy.toLowerCase())
              .map((x, i) => (
                <li key={i}>
                  {x.name} {x.number}
                </li>
              ))
          : persons.map((x, i) => (
              <li key={i}>
                {x.name} {x.number}
              </li>
            ))}
      </ul>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 12345 },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
  });

  const [filterBy, setFilterBy] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const addPerson = (event) => {
    event.preventDefault();
    const sameName = persons.map(
      (x) => x.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (sameName.includes(true)) {
      alert(`${formData.name} is already in the phone book`);
      return;
    }

    setPersons([...persons, { name: formData.name, number: formData.number }]);
    setFormData({
      name: "",
      number: "",
    });
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} />

      <Form
        addPerson={addPerson}
        handleInputChange={handleInputChange}
        formData={formData}
      />

      <h2>Numbers</h2>

      <People filterBy={filterBy} persons={persons}/>
    </div>
  );
};

export default App;
