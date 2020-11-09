const mongoose = require('mongoose')

const init = () => {
  console.log('init mongo')
  console.log(process.env.DB_URL)

  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(err => {
      console.error('Mongo CONNECT error: ' + err.stack)
      process.exit(1)
    })
  mongoose.connection.on('open', () => {
    console.log('connected to database')
  })
}

mongoose.Promise = global.Promise

module.exports = init
