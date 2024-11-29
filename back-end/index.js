const express = require('express')
const bodyParser = require('body-parser')

const repo = require('./repository/repo')
const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Routs
app.get('/tasks', repo.getInbox)
app.post('/tasks', repo.createTask)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

