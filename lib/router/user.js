const express = require('express')
const User = require('../models/user')
const Ride = require('../models/ride')
const auth = require('../middleware/auth')
const debug = require('debug')('dynamic:router:user:')

const router = express.Router()
/**
 *  @module router/user
 */


/**
 * Create a new user
 * @name POST users/register
 * @function
 * @param {string} email  users email
 * @param {string} firstName  users first name
 * @param {string} secondName  users second name
 * @param {number} [account=20]  users ballance
 * @param {string} password  users password
 * @param {string} [currency=usd]  users main currency
 * @param {string} [language=eng]  UI language
 * @memberof module:router/users
 * @inner
 * 
 * @returns { Object }
 * 
 * @example
 * 
 * 
 * {
 *  email: 'admin@gmail.com'
 *  password: 'user123', // this value will be hashed,
 *  firstName: 'Johan',
 *  secondName: 'Bach,
 *  account: 50,
 *  currency: 'usd-$',
 *  language: 'eng'
 * }
 */

router.post('/users/register', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        debug(`${user} has signed up!`)
        res.status(201).send({ user, token })
        debug(user)
    } catch (error) {
        debug(error)
        res.status(400).send(error)
    }
})

/**
 * Login as existing user
 * @name POST users/login
 * @function
 * @param {string} email  users email
 * @param {string} password  users password
 * @memberof module:router/user
 * @inner
 * 
 * @returns { Object }
 * 
 * @example
 * 
 * {
 *  email: 'admin@gmail.com'
 *  password: 'user123',
 * }
 */

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        debug(email, password)
        const user = await User.findByCredentials(email, password)
        if (!user) {
            debug('no user found')
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        debug(`${email} has loged in!`)
        res.send({token}    )
    } catch (error) {
        console.log(error)
        res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }

})


/**
 * Get your users data
 * @name GET users/me
 * @function
 * @memberof module:router/user
 * @inner
 * 
 * @returns { Object }
 * 
 * @example
 * 
 * {
 *  email: 'admin@gmail.com'
 *  password: 'user123',
 * }
 */

router.get('/users/me', auth, async(req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const { account, email, firstName, secondName, priceReliefPercent, language, currency, _id } = await User.findOne({'tokens.token': token })
        const rides = await Ride.find({paidBy: _id})
        debug(rides)
        res.send({ account, email, firstName, secondName, priceReliefPercent, language, currency, rides })
    } catch (error) {
        debug(error)
        res.status(400).send(error)
    }
})

module.exports = router