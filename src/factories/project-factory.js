import { parseTodos } from "./todo-factory";

const projectProto = {
  addTodo(todo) {
    this.todosArray.push(todo);
  },
  removeTodo(todoid) {
    const todoIndex = this.todosArray.findIndex((t) => {
      t.id === todoid;
    });
    if (todoIndex !== -1) {
      this.todosArray.splice(todoIndex, 1);
    }
    return todoIndex;
  },

  getTodoWithId(todoId) {
    return this.todosArray.find((t) => {
      return t.id === todoId;
    });
  },

  emptyTodoArray() {
    this.todosArray.length = 0;
  },
};

export default function ProjectFactory({ id, name, todos }) {
  const project = Object.create(projectProto);
  project.id = id;
  project.name = name;
  project.todosArray = [...todos];

  return project;
}

function parseProjects(projectsArray) {
  if (!projectsArray) return;
  const parsedProjects = [];
  for (const project of projectsArray) {
    parsedProjects.push(
      ProjectFactory({
        id: project.id,
        name: project.name,
        todos: parseTodos(project.todosArray),
      })
    );
  }
  return parsedProjects;
}

export { parseProjects };
