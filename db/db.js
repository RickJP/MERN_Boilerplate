const mongoose = require('mongoose');
require('dotenv').config();

const env = process.env;
const USER = env.MONGO_USER;
const PW = env.MONGO_PW;
const SERVER = env.MONGO_SERVER;

const uri = `mongodb+srv://${USER}:${PW}@${SERVER}`
const options = {useNewUrlParser: true, useUnifiedTopology: true }

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  console.log('Connection to mongodb established')
})

mongoose.connection.on('reconnected', () => {
  console.log('Connection  to mongodb Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from mongodb')
})

mongoose.connection.on('close', () => {
  console.log('Connection to mongodb closed')
})

mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
})

const run = async () => {
  await mongoose.connect(uri,options)
}

run().catch(error => console.error(error))