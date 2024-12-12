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
  const sql = `SELECT *
               FROM tasks
               where status = 'Todo' and (date is null and time is null and priority is null)
                  or context_id is null
                  or category is null
               ORDER BY id`
  console.log(sql)
  db.any(sql)
    .catch(err => handleError(err))
    .then(data => {
      response.status(200).json(data)
    })
}
const getTasks = (request, response) => {
  const conditions = constructConditions(request)
  const sql = `SELECT *
               FROM tasks ${conditions}
               ORDER BY id`
  console.log(sql)
  db.any(sql)
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
      const columns = ['date', 'title', 'context_id', 'time', 'notes', 'priority', 'status', 'category']
      const query = pgp.helpers.insert(request.body, columns, 'tasks') + 'RETURNING id'
      db.one(query).then(data => {
          request.body.id = data.id
          response.status(201).send(request.body)
        }
      ).catch(err => handleError(err))
    })
}
const getATask = (request, response) => {
  const id = request.params.id
  db.one('SELECT * FROM tasks where id = $1', id)
    .catch(err => handleError(err))
    .then(data => {
      response.status(200).json(data)
    })
}
const updateTask = (request, response) => {
  const id = request.params.id
  db.one('SELECT * FROM tasks where id = $1', id)
    .catch(err => handleError(err))
    .then(() => {
      return getOrCreateContextId(request.body.context_id)
        .then((contextData) => {
          request.body.context_id = contextData?.id
          const condition = pgp.as.format(' WHERE id = $1', request.body.id)
          const columns = ['date', 'title', 'context_id', 'time', 'notes', 'priority', 'status', 'category']
          const update = pgp.helpers.update(request.body, columns, 'tasks') + condition
          db.query(update)
            .catch(err => handleError(err))
            .then(data => {
              response.status(204).json(data)
            })
        })
    })
}

const deleteTask = (request, response) => {
  const sql = pgp.as.format('DELETE FROM tasks WHERE id = $1', request.params.id)
  db.query(sql)
    .catch(err => handleError(err))
    .then(data => {
      response.status(202).json(data)
    })
}


function constructConditions(request) {
  let condition = `WHERE `
  const restrictions = []
  if (request.query.id) {
    restrictions.push(`id = ${request.query.id} `)
  }
  if (request.query.title) {
    restrictions.push(`title like '%${request.query.title}%'`)
  }
  if (request.query.notes) {
    restrictions.push(`notes like '%${request.query.notes}%'`)
  }
  if (request.query.date) {
    restrictions.push(`date = '${request.query.date}'`)
  }
  if (request.query.priority) {
    restrictions.push(`priority = '${request.query.priority}'`)
  }
  if (request.query.status) {
    restrictions.push(`status = '${request.query.status}'`)
  }
  if (request.query.context_id) {
    restrictions.push(`context_id = '${request.query.context_id}'`)
  }
  if (request.query.category) {
    restrictions.push(`category = '${request.query.category}'`)
  }
  condition = condition.concat(restrictions.join(' and '))
  console.log(condition)
  return condition === 'WHERE ' ? '' : condition
}


const markATaskAsDone = (request, response) => {
  const sql = pgp.as.format(`UPDATE tasks
                             set status = 'Done'
                             WHERE id = $1`, request.params.id)
  db.query(sql)
    .catch(err => handleError(err))
    .then(data => {
      response.status(200).json(data)
    })
}


const getContext = (request, response) => {
  db.any('SELECT * FROM contexts ORDER BY id')
    .catch(err => handleError(err))
    .then(data => {
      response.status(200).json(data)
    })
}
const createContext = (request, response) => {
  const columns = ['context', 'reviewfreq', 'lastrev', 'nextrev']
  const query = pgp.helpers.insert(request.body, columns, 'contexts') + 'RETURNING id'
  db.one(query).then(data => {
      request.body.id = data.id
      response.status(201).send(request.body)
    }
  ).catch(err => handleError(err))
}

const getAContext = (request, response) => {
  const id = request.params.id
  db.one('SELECT * FROM contexts where id = $1', id)
    .catch(err => handleError(err))
    .then(data => {
      response.status(200).json(data)
    })
}
module.exports = {
  getInbox,
  getTasks, createTask, getATask, updateTask, deleteTask, markATaskAsDone,
  getContext, createContext, getAContext
}
