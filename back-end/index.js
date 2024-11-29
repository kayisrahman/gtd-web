const express = require('express')
const { Pool } = require('pg')

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/inbox', (req, res) => {
  return getInbox(req, res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Repositories definition
const pool = new Pool({
  user: 'kayisrahman',
  host: 'localhost',
  database: 'gtd',
  password: 'password',
  port: 5432
})

const getInbox = (request, response) => {
  pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

