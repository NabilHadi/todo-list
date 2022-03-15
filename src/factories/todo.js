import { v4 as uuidv4 } from "uuid";

export default class Todo {
  constructor({
    id = uuidv4(),
    title,
    description,
    dueDate,
    priority,
    isComplete = false,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
  }

  addNote(note) {
    this.notes.push(note);
  }

  removeNote(note) {
    const index = tihs.notes.findIndex((n) => {
      return n === note;
    });
    if (index !== -1) {
      this.notes.splice(index, 1);
    }

    return index;
  }

  toggleCompleteState() {
    return (this.isComplete = !this.isComplete);
  }
}

function parseTodos(todosArray) {
  const parsedTodos = [];
  for (const todo of todosArray) {
    parsedTodos.push(new Todo(todo));
  }
  return parsedTodos;
}

export { parseTodos };
