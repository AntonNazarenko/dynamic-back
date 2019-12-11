const express = require('express')
const app = express()
const useragent = require('express-useragent')

const cors = require('cors')
const userRouter = require('./router/user')
const rideRouter = require('./router/ride')
const adminRouter = require('./router/admin')

const debug = require('debug')('dynamic:index')

const { PORT } = process.env

require('./db/db')

app.use(cors())
app.use(express.json())
app.use(useragent.express())

app.use(userRouter)
app.use(rideRouter) 
app.use(adminRouter)

app.listen(PORT, () => debug(`Server started on port: ${PORT}`))
