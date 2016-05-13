'use strict';

var parse = require('co-body');
var db = require('../db')

module.exports = {
  getTodos: function* (){

    //let rows = yield db.query('SELECT todo_id, task, completed FROM todoApp WHERE client_id=? AND client_secret=?', [clientId, clientSecret]);
    let result = [];
    let rows = yield db.query('SELECT todo_id, task, completed FROM todos');
    let todos = rows[0];
    todos.forEach(todo => {
      result.push({
        id: todo.todo_id,
        text: todo.task,
        completed: !!todo.completed
      });
    })

    this.body = result;
    this.status = 200;
  }
};
