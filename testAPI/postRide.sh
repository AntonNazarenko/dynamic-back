#!/bin/bash

curl "$url/ride" \
     -X POST \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVkMzY2MWE1YWQzYTMwMDBhMGMwNDAiLCJpYXQiOjE1NzU4MzgzMTN9.zIsOdNV5PV3xNDVNfbWw6tHI2tpFXEA3-ZmwTx9hAI0' \
     -d '{"stationName": "Pushkinska", "price": 8}' \