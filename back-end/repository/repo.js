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
        .catch(err => handleError(err))
    })
}
const createTask = (request, response) => {
  return getOrCreateContextId(request.body.context_id)
    .then((data) => {
      request.body.context_id = data?.id
      const query = pgp.helpers.insert(request.body, ["date","title","context_id","time","notes","priority"], 'tasks') + 'RETURNING id'
      db.one(query).then(data => {
          request.body.id = data.id
          response.status(201).send(request.body)
        }
      ).catch(err => handleError(err))
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
