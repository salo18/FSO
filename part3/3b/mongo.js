const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

console.log(process.argv);

const password = process.argv[2];

const url = `mongodb+srv://salocode14:${password}@cluster0.zgskgi1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: BigInt,
});

const Contact = mongoose.model('Contact', contactSchema);

// const contact = new Contact({
//   name: 'Ana Test',
//   number: 123,
// })

// contact.save().then(res => {
//   console.log('note saved!');
//   mongoose.connection.close();
// })

Contact.find({}).then(result => {
  result.forEach(x => console.log(x))
  mongoose.connection.close();
})