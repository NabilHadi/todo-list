import { parseTodos } from "./todo-factory";

export default function ProjectFactory({ id, name, todos }) {
  const todosArray = [...todos];

  function addTodo(todo) {
    todosArray.push(todo);
  }

  function removeTodo(todoid) {
    const todoIndex = todosArray.findIndex((t) => {
      t.id === todoid;
    });
    if (todoIndex !== -1) {
      todosArray.splice(todoIndex, 1);
    }
    return todoIndex;
  }

  function getTodoWithId(todoId) {
    return todosArray.find((t) => {
      return t.id === todoId;
    });
  }

  function emptyTodoArray() {
    todosArray.length = 0;
  }

  return {
    get id() {
      return id;
    },
    get todosArray() {
      return [...todosArray];
    },
    name,
    addTodo,
    removeTodo,
    getTodoWithId,
    emptyTodoArray,
  };
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
