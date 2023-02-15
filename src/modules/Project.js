import { v4 as uuid } from "uuid";

export default class Project {
  constructor(name = "", todos = []) {
    this.id = uuid();
    this.name = name;
    this.todos = todos;
  }
}
