import { v4 as uuid } from "uuid";

export default class Todo {
  constructor(title = "", description = "", dueDate = "", priority = 0) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
