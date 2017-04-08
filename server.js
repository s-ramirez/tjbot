const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.json');

var tasksCtrl = require('./controllers/tasks.controller.js');
const ActionsCtrl = require('./controllers/actions.controller.js');

/**** Initialize web server ****/
console.log(chalk.green("[*] Starting Web Server..."));
var app = express();
var http = require('http').Server(app);
var actionsCtrl = new ActionsCtrl();

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
  
  actionsCtrl.process(action);
  res.send('succcess');
});

app.delete('/task', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.get('/task', function(req, res){
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
