const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const debug = require('debug')('dynamic:router:ride:')

const router = express.Router()

/**
 *  @module router/admin
 */

router.get('/admin', auth, async (req, res) => {
    try {
        return res.status(201).send('admin detected')
    } catch (error) {
        res.status(400).send(error)
    }
})

/**
 * Toggle admin permissions
 * @name PATCH /admin/toggle-admin
 * @function
 * @memberof module:router/admin
 * @inner
 * @param { String } email — user to toggle admin permissons
 * @returns { String }
 * 
 * @example
 * 
 * {
 *  station: 'Naukova'
 *  price: 8.00,
 * }
 */
router.patch('/admin/toggle-admin', auth, async(req, res) => {
    const { email } = req.body
    let { isAdmin } = await User.findOne({'email': email })
    await User.findOneAndUpdate({'email': email }, { isAdmin: !isAdmin })
    return res.send(`${email} has been updated`)
})

module.exports = router