const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.json({
    api: 'api kopi v1'
  })
})

app.use('/users', require('./routes/auth'))
app.use('/data-kopi', require('./routes/DataKopi'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})