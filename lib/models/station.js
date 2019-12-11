const mongoose = require('mongoose')
const validator = require('validator')

const stationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    supportManager: {
        type: String,
        required: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    currentPrice: { 
        type: Number,
        required: true, 
        default: 0
    }
})

terminalSchema.statics.findByStationName = async (name) => {
    // Search for a terminal by id
    const station = await Station.findOne({ name } )
    if (!station) {
        throw new Error({ error: 'Invalid station name' })
    }
    return station
}

const Station = mongoose.model('Station', stationSchema)

module.exports = Station