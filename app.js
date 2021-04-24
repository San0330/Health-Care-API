const express = require('express')
const productRouter = require('./routes/api/productsRoutes')
const categoryRouter = require('./routes/api/categoryRoutes')
const appointmentRouter = require('./routes/api/appointmentRoutes')
const orderRouter = require('./routes/api/orderRoutes')
const authRouter = require('./routes/api/authRoutes')
const doctorRouter = require('./routes/api/doctorRoutes')
const userRouter = require('./routes/api/userRoutes')
const errorHandler = require('./controllers/errorHandler')

const app = express()

// for parsing the request body on POST request
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: false }))

// just for logging
app.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})

// make this folder static, it contains all the uploaded images
app.use('/api/image', express.static('public/images'))


app.use('/api/view', require('./routes/api/viewRoutes'))

app.use('/api/products', productRouter)
app.use('/api/categorys', categoryRouter)
app.use('/api/appointment', appointmentRouter)
app.use('/api/orders', orderRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/doctors', doctorRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/survey', require('./routes/api/surveyRoutes'))

//for handling unknown routes
app.all('*', (req, res, next) => {
    const errMsg = `Can't find ${req.originalUrl} on this server !`

    //passing anything to next is treated as error
    //and is directed to ErrorHandling middleware

    next(errMsg)
})

//use to handle the error, when something is passed inside next()
app.use(errorHandler)

module.exports = app
