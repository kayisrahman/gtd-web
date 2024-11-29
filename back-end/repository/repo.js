const { response } = require('express')
const result = require('pg/lib/query')
const Pool = require('pg').Pool

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

const getOrCreateContextId = (context) => {
  pool.query(
    `SELECT id
     FROM contexts
     WHERE context = $1`, [context], (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows) {
        return results.rows[0].id
      } else {
        pool.query(
          `INSERT INTO contexts
           VALUES ($1)`, [context], (error, results) => {
            if (error) {
              throw error
            }
            return results.rows[0].id
          })
      }
    })
  return null
}
const createTask = (request, response) => {
  console.log(request)
  const { title, notes, date, time, context, priority } = request.body

  const context_id = getOrCreateContextId(context)

  pool.query('INSERT INTO tasks (title, notes, date, time, context_id, priority) ' +
    'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, notes, date, time, context_id, priority],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Task added added with ID: ${results.rows[0].id}`)
    })
}

module.exports = {
  getInbox,
  createTask
}
