# Nearty

Cooming soon

## Endpoints

curl -X POST http://localhost:3000/auth/login -d '{"username": "santicode", "password": "tybaco"}' -H "Content-Type: application/json"


curl -X GET "http://localhost:3000/places/nearby?latitude=40.748817&longitude=-73.985428" \
     -H "Authorization: Bearer <token>"