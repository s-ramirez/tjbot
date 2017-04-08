"use strict";
var fs = require('fs');
var tasks = require('./taskList');

class Tasks {

  constructor(){
    this.taskList = tasks;
    if (this.taskList.length > 0) {
      this.lastId = this.taskList[this.taskList.length - 1].id;
    } else {
      this.lastId = 0;
    }
  }

  add(newTask) {
    this.lastId++
    newTask.id = this.lastId;
    this.taskList.push(newTask);
    this.saveList();
  }

  list() {
    return this.taskList;
  }

  next() {
    var next = this.taskList[0];
    this.taskList.splice(0,1);
    console.log(this.taskList);
    this.saveList();
    return next;
  }

  get(id) {
    var index = this.taskList.map(function(e) { return e.id; }).indexOf(id);
    return this.taskList[index];
  }

  delete(id) {
    var index = this.taskList.map(function(e) { return e.id; }).indexOf(id);
    this.taskList.splice(index,1);
    this.saveList();
  }

  saveList() {
    var stringList = JSON.stringify(this.taskList,null,'\t');
    fs.writeFile('./controllers/taskList.json',stringList,function(err) {
      if(err) return console.error(err);
      // console.log('task list saved');
    });
  }
}

module.exports = Tasks;
