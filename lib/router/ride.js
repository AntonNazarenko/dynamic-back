const express = require('express')
const Ride = require('../models/ride')
const User = require('../models/user')
const auth = require('../middleware/auth')
const debug = require('debug')('dynamic:router:ride:')

const router = express.Router()

/**
 *  @module router/ride
 */

/**
 * Post a new ride
 * @name POST /ride
 * @function
 * @memberof module:router/ride
 * @inner
 * 
 * @returns { Object }
 * 
 * @example
 * 
 * {
 *  station: 'Naukova'
 *  price: 8.00,
 * }
 */

router.post('/ride', async (req, res) => {
    try {
        let { price, email } = req.body
        let { _id, account, priceReliefPercent} = await User.findOne({'email': email })
       
        price = (price / 100) * priceReliefPercent
        
        if( account  - price <  0) { 
            debug('not enough money')
            return  res.status(400).send({data: 'not enough money', canAccess: false })
        }

        account = account - price
        
        const ride = new Ride({...req.body, paidBy: _id, moneyPaid: price, rideDate: Date.now()})
        await ride.save()

        await User.findOneAndUpdate({ 'email': email }, { account })
        
        return res.status(201).send({ currentBalance: account, canAccess: true })
    } catch (error) {
        debug(error)
        res.status(400).send({...error, canAccess: false})
    }
})

/**
 * Get array of users rides
 * @name GET /rides
 * @function
 * @memberof module:router/ride
 * @inner
 * 
 * @returns { Array }
 * 
 */

router.get('/rides', auth, async(req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const { _id} = await User.findOne({'tokens.token': token })
        if (!user) {
            debug('no user found')
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const rides = await Ride.findMany({ paidBy: _id})
        res.status(200).send({rides})
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router