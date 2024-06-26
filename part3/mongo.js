const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.57f60cv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength: 4,
        required:true
    },
    number: String,
})

module.exports = mongoose.model('Person',personSchema)
/* if (process.argv.length<4){
    Person.find({}).then(result=>{
        result.forEach(person =>{
            console.log(person)})
        //mongoose.connection.close()
    })
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
}
 */