const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const https = require('https');
const fs = require('node:fs');

const repo = require('./repository/repo')
const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Routs
app.get('/inbox', repo.getInbox)
app.get('/tasks', repo.getTasks)
app.get('/tasks/:id', repo.getATask)
app.post('/tasks', repo.createTask)
app.put('/tasks/:id', repo.updateTask)
app.delete('/tasks/:id', repo.deleteTask)
app.patch('/tasks/done/:id', repo.markATaskAsDone)


app.get('/context', repo.getContext)

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/kayis-gtd.uksouth.cloudapp.azure.com/privkey.pem', 'utf8'),
  cert: fs.readFileSync("/etc/letsencrypt/live/kayis-gtd.uksouth.cloudapp.azure.com/cert.pem", 'utf8'),            //Change Main Certificate Path here
  ca: fs.readFileSync('/etc/letsencrypt/live/kayis-gtd.uksouth.cloudapp.azure.com/chain.pem', 'utf8'),             //Change Intermediate Certificate Path here
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

