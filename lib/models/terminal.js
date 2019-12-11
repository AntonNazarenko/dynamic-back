const mongoose = require('mongoose')

const terminalSchema = mongoose.Schema({
    terminalId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    station: {
        type: String,
        required: true,
    }
})

terminalSchema.statics.findByTerminalId = async (id) => {
    // Search for a terminal by id
    const term = await Terminal.findOne({ id } )
    if (!term) {
        throw new Error({ error: 'Invalid terminal id' })
    }
    return term
}

const Terminal = mongoose.model('Terminal', terminalSchema)

module.exports = Terminal