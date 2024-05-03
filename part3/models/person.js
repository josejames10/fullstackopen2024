
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.M;
console.log("url:", url);

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB');
})
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

module.exports = mongoose.model('Person', personSchema)
/* if (process.argv.length<4){
    Person.find({}).then(result=>{
        result.forEach(person =>{
            console.log(person)})
        }
        //mongoose.connection.close()
    )
        
    }else{
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        })
        
        person.save().then(result =>{
            console.log(`added ${process.argv[3]} number${process.argv[4]} to phonebook`)
            mongoose.connection.close()
        }
        
    )
} */