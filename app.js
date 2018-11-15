import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import * as config from './config/default.json'
import router from './router'
mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, { useNewUrlParser: true })
    .then(() => console.log(`connecting to database successful, ${config.mongoUri}`))
    .catch(err => console.error('could not connect to mongo DB', err))

const app = express()

app.get('/', (req, res) => {
    res.send({
        'hello': 'world'
    })
})

app.use(bodyParser.json())
router(app)

app.listen(config.httpPort, () => {
    console.log('server started at http://localhost:' + config.httpPort)
})

module.exports = app
