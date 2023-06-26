const express = require('express')
const app = express()
const port = 3000
const path = require ('path')
const cors = require('cors')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    api: 'api kopi v1'
  })
})

app.use(
  '/img',
  express.static(path.join(__dirname, "public/img"))
)

app.use('/users', require('./routes/auth'))
app.use('/data-kopi', require('./routes/DataKopi'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})