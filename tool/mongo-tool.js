import mongoose from 'mongoose'
import refreshMongo from './refresh-mongo'
import * as config from '../config/default.json'

mongoose.connect(config.mongoUri, { useNewUrlParser: true })
  .then(() => console.log(`connecting to database successful, ${config.mongoUri}`))
  .catch(err => console.error('could not connect to mongo DB', err))

refreshMongo(() => {
  process.exit(0)
})
