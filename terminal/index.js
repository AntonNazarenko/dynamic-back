const express = require('express')
const request = require('request-promise')

const app = express()
app.use(express.json())

const { STATION, ID } = process.env

let currentPrice = 0


function simulatePriceCalculation (min, max) {
  currentPrice = parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

simulatePriceCalculation(4, 10)

app.post('/payment', async (req, res) => {
  try { 
    const { email } = req.body
    console.log(currentPrice)
    const options = {
      method: 'POST',
      uri: 'https://49c5caac.ngrok.io/ride',
      body: {
         stationName: STATION,
         price: currentPrice,
         email,
      },
      json: true
    }

    const ride  = await request(options)
    if (ride.canAccess) { 
       return res.send({canAccess: true, message: 'payment success!', currentBalance: ride.currentBalance})
    }
    return res.send({canAccess: false, message: 'payment failed!'})
  } catch (err) {
       res.send(err)
  }
})

setInterval(() => simulatePriceCalculation(4, 10), 60000 * 5)

app.listen(45001, ()=> console.info(`${STATION}-${ID}: terminal is running`))
