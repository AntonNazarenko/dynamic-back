#!/bin/bash
curl "$url/users/login" -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --data '{"email": "'"$email"'", "password": "'"$pass"'"}'