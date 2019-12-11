const jwt = require('jsonwebtoken')
const User = require('../models/user')
const debug = require('debug')('dynamic:middleware:auth')

const auth = async(req, res, next) => {
    try {
        const { path } = req
        let resolvedDevice = false
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        console.log(req.useragent)
        if (path.includes('/admin')) {
            if (!user.isAdmin ) { 
                return res.status(404).send( new Error('not found') )
            }
            if (req.useragent.isDesktop || req.useragent.browser === 'PostmanRuntime' || req.useragent.isCurl) {
                resolvedDevice = true
            }
            if (!resolvedDevice) { 
                return res.status(404).send( new Error(`can't access /admin source from this device. Available only on a desktop.`) )
            }
        }
  
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth