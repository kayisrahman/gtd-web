

const { resp, response } = require('express')

const promise = require('bluebird') // or any other Promise/A+ compatible library;
const { handleError } = require('../helper/error-handlers')

const connection = {
  user: 'kayisrahman',
  host: 'localhost',
  database: 'gtd',
  password: 'password',
  port: 5432,
  allowExitOnIdle: true
}
const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
}
const pgp = require('pg-promise')(initOptions)
const db = pgp(connection)

const getInbox = (request, response) => {
  db.any('SELECT * FROM tasks ORDER BY id')
    .catch(err => handleError(err))
    .then(data => {
      response.status(200).json(data)
    })
}

const getOrCreateContextId = (context) => {
  return db.oneOrNone(
    `SELECT id
     FROM contexts
     WHERE context = $1`,
    [context])
    .catch(err => handleError(err))
    .then(context_id => {
      return context_id || db.one(
        `INSERT INTO contexts (context)
         VALUES ($1)
         RETURNING *`, [context])
        .then((data) => data)
        .catch(err => handleError(err))

    })
}
const createTask = (request, response) => {
  const { title, notes, date, time, context, priority } = request.body

  const context_id = getOrCreateContextId(context)
  pool.query(
    `INSERT INTO tasks (title, notes, date, time, context_id, priority)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, notes, date, time, context_id, priority],
    (error, results) => {
      handleError(error, results)
      response.status(201).send(`Task added added with ID: ${results.rows[0].id}`)
    })
}
const getContext = (request, response) => {
  db.any('SELECT * FROM contexts ORDER BY id')
    .catch(err => handleError(err))
    .then(data => {
      response.status(200).json(data)
    })
}
module.exports = {
  getInbox,
  createTask,
  getContext
}
