const express = require("express");
const app = express();
var morgan = require('morgan')

const mongoose = require('mongoose');

const url = `mongodb+srv://salocode14:${process.env.MONGO_PW}@cluster0.zgskgi1.mongodb.net/?retryWrites=true&w=majority`


app.use(express.json());
// app.use(morgan('tiny'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms')
// )


mongoose.set('strictQuery',false)
mongoose.connect(url);


// const requestLogger = (req, res, next) => {
//   console.log("Method:", req.method);
//   console.log("Path:", req.path);
//   console.log("Body:", req.body);
//   console.log("---");
//   next();
// };

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// app.use(requestLogger);

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      phoneBook.length
    } people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phoneBook.find((x) => x.id === id);

  if (person) {
    response.status(200).json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phoneBook = phoneBook.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "content missing" });
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  } else if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  } else if (phoneBook.find((x) => x.name === body.name)) {
    return response.status(400).json({ error: "name is already taken!" });
  }

  const newEntry = {
    name: body.name,
    number: body.number,
    id: Math.random(50),
  };

  phoneBook = phoneBook.concat(newEntry);

  response.json(newEntry);
});

app.use(unknownEndpoint)


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
