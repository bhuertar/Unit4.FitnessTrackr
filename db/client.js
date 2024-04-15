const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/fitness_trackr');

// Tests connection
// client.connect();
// console.log('CONNECTED');

module.exports = client;