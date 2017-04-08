const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.json');

const ActionsCtrl = require('./controllers/actions.controller.js');
const TasksCtrl = require('./controllers/tasks.controller.js');

/**** Initialize task queue ****/
var tasksCtrl = new TasksCtrl();
var actionsCtrl = new ActionsCtrl();

/**** Initialize web server ****/
console.log(chalk.green("[*] Starting Web Server..."));
var app = express();
var http = require('http').Server(app);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/task', (req, res) => {
  messageHandler(req.query.message).then((result)=>{
    res.send(result);
  });
});

app.post('/task', function (req, res) {
  var action = req.body.action;
  var opts = req.body.opts;
  var owner = req.body.owner;
  
  tasksCtrl.add({"action": action, "opts": opts, "owner": owner});
  queueHandler();
  res.send('succcess');
});

app.delete('/task/:id', function (req, res) {
  var id = req.param.id;
  tasksCtrl.delete(id);
  res.send('deleted');
})

app.get('/tasks', function(req, res){
  var list = tasksCtrl.list();
  res.json(list)
});

app.get('/task/:id', function(req, res){
  var id = req.param.id;
  var item = tasksCtrl.get(id);
  res.json(item)
});

/**** Handle the queue and dispatch actions ****/
function queueHandler() {
  console.log(tasksCtrl.list());
  while(tasksCtrl.list().length > 0) {
	actionsCtrl.process(tasksCtrl.next());
  }
}

var port = process.env.PORT || 8080;

// Initialize the http server in a specified port
http.listen(port, function(){
  console.log('Listening on http://localhost:' + port);
});

/**** Handle Ctrl + C ***/
process.on('SIGINT', ()=> {
  console.log(chalk.red("\n[*] Terminating..."));
  process.exit();
});

queueHandler();
