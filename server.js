const mongoose = require('mongoose')

//for setting "nodejs env variables" from config.env file
//set it before app.js, app.js may need to use config informations.
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./app')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

var db = mongoose.connection
db.on('error', () => console.error("Databse connection error"));
db.once('open', () => console.log("connected"));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))