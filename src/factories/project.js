import { parseTodos } from "./todo";

export default class Project {
  constructor({ id, name, todos }) {
    this.id = id;
    this.name = name;
    this.todos = todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    const index = this.todos.findIndex((t) => {
      return t.id === todoId;
    });

    if (index !== -1) {
      this.todos.splice(index, 1);
    }

    return index;
  }

  getTodoWithId(todoId) {
    return this.todos.find((t) => {
      return t.id === todoId;
    });
  }

  emptyTodoArray() {
    this.todos.length = 0;
  }
}

function parseProjects(projectsArray) {
  if (!projectsArray) return;
  const parsedProjects = [];
  for (const project of projectsArray) {
    parsedProjects.push(
      new Project({
        id: project.id,
        name: project.name,
        todos: parseTodos(project.todos),
      })
    );
  }
  return parsedProjects;
}

export { parseProjects };
