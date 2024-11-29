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

const createTask = (request, response) => {
  console.log(request)
  const { title, notes, date, time, context, priority } = request.body

  pool.query('INSERT INTO tasks (title, notes, date, time, context_id, priority) ' +
    'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, notes, date, time, context, priority],
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
