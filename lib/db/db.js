
const mongoose = require('mongoose')
// const { MONGODB } = process.env

const debug = require('debug')('dynamic:db')

mongoose.connect('mongodb+srv://dynamicAdmin:33mc51gUGPYG0vCh@dynamiccluster-wo8pw.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
})
.then(() => debug('db connected!'))
.catch((err) => debug(err))

