const express = require('express')
const request = require('request-promise')

const app = express()

const { STATION } = proccess.env

let currentPrice


function simulatePriceCalculation (min, max) {
  currentPrice = Math.random() * (max - min) + min
}

app.post('/payment', async (req, res) => {
  const options = {
    method: 'POST',
    uri: 'https://49c5caac.ngrok.io/ride',
    body: {
       stationName: STATION,
       price: currentPrice
    },
    json: true
  }
  
  const ride  = await request(options)
  if (ride.canAccess) { 
     return res.send({canAccess: true, message: 'payment success!'})
  }
  return res.send({canAccess: false, message: 'payment failed!'})
})

setInterval(() => simulatePriceCalculation(4, 10), 60000 * 5)

app.listen(45001, ()=> console.info('terminal is running'))
