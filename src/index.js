import { v4 as uuid } from "uuid";

class Todo {
  constructor(title = "", description = "", dueDate = "", priority = 0) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class Project {
  constructor(name = "", todos = []) {
    this.id = uuid();
    this.name = name;
    this.todos = todos;
  }
}

const myTodo = new Todo("test", "desc", "tmw", 0);
console.log(myTodo);
