'use strict';

var parse = require('co-body');
var db = require('../db')


let data = [];
data.push({
  id: -1,
  likes: 0,
  title: '少壮不努力 老大怨水逆 ' + -1,
  text: `生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情`
});
data.push({
  id: -2,
  likes: 0,
  title: '少壮不努力 老大怨水逆 ' + -2,
  text: `生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
         生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情`
});
for(let i=0; i<400; i++){
  data.push({
    id: i,
    likes: 0,
    title: '少壮不努力 老大怨水逆 ' + i,
    text: `生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
           生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
           生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
           生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
           生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
           生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情
           生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情 生命只有一次 这是最无奈也是最美丽的事情`
  })
}

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
  },

  getNotes: function* (){
    let startIndex = Number(this.request.query.startIndex);
    let endIndex = (startIndex+20) <= data.length ? startIndex+20 : data.length;
    let hasMore = (startIndex+20) <= data.length;

    let result = {
      notes: data.slice(startIndex,endIndex),
      hasMore: hasMore,
      startIndex: hasMore ? endIndex : null
    }
    this.body = result;
    this.status = 200;
  }

};
