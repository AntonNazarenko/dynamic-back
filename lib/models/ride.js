const mongoose = require('mongoose')

const rideSchema = mongoose.Schema({
    stationName: {
        type: String,
        required: true,
        trim: true
    },
    moneyPaid: {
        type: Number,
        required: true,
        default: 0
    },
    rideDate: { 
        type: Date,
        dafault: Date.now()
    },
    paidBy: { 
        type: String,
        required: false,
        minLength: 0,
    }
})

const Ride = mongoose.model('Ride', rideSchema)

module.exports = Ride