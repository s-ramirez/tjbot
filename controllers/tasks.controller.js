"use strict";
var fs = require('fs');
// var tasks = require('./taskList');

class Tasks {

  constructor(){
    this.taskList = tasks;
    this.lastId = taskList[taskList.length - 1].id;
    console.log(this.taskList);
  }

  add(newTask) {
    this.taskList.push(newTask);
    saveList();
  }

  list() {
    return this.taskList;
  }

  next() {
    var next = this.taskList[0];
    this.taskList.remove(0);
    saveList();
    return this.taskList[0];
  }

  get(id) {
    var index = taskList.map(function(e) { return e.id; }).indexOf(id);
    return taskList[id];
  }

  delete(id) {
    var index = taskList.map(function(e) { return e.id; }).indexOf(id);
    taskList.remove(index);
    saveList();
  }

  saveList() {
    newTasklist = JSON.stringify(taskList,null,'\t');
    fs.writeFile('./taskList.json',string,function(err) {
      if(err) return console.error(err);
      console.log('done');
    });
  }
}
