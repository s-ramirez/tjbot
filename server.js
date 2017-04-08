const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.json');

var TasksCtrl = require('./controllers/tasks.controller.js');

/**** Initialize task queue ****/
var tasksCtrl = new TasksCtrl();

/**** Initialize web server ****/
console.log(chalk.green("[*] Starting Web Server..."));
var app = express();
var http = require('http').Server(app);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/action', (req, res) => {
  messageHandler(req.query.message).then((result)=>{
    res.send(result);
  });
});

app.post('/action', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.delete('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/**** Temporary message handler for client adapters ****/
function messageHandler(message) {
  console.log('Received', message);
  return analyzer.parse(message.message).then((response) => {
    var intent = response['intent'];
    message.parsed = response;
    console.log(response);
    if(intent in skills) {
      return skills[intent].handle_request(message);
    }
    console.log(response);
    return JSON.stringify(response);
  }, (error) => { console.log(error) });
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

// tasksCtrl.add({"action":"led", "opts":{}, "owner":"gandalf"});
// console.log(tasksCtrl.next());
// console.log(tasksCtrl.list());
// console.log(tasksCtrl.get(5));
// tasksCtrl.delete(5);
