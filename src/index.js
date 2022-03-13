import storageController from "./storage-controller";

function ProjectFactory({ name, todos }) {
  const todosArray = [...todos];

  function addTodo(todo) {
    todosArray.push(todo);
  }

  function removeTodo(todo) {
    todosArray.filter((t) => {
      return todo !== t;
    });
  }

  function getTodoWithId(id) {
    return todosArray.find((t) => {
      return t.id === id;
    });
  }

  function getAllTodos() {
    return [...todosArray];
  }

  function emptyTodoArray() {
    todosArray.length = 0;
  }

  function toJSON() {
    return { name, todosArray };
  }

  return {
    name,
    addTodo,
    removeTodo,
    getTodoWithId,
    getAllTodos,
    emptyTodoArray,
    toJSON,
  };
}

function TodoFactory({
  id,
  title,
  description,
  dueDate,
  priority,
  isComplete = false,
  notes = [],
  subTodos = [],
}) {
  function addNote(note) {
    notes.push(note);
  }

  function addSubTodo(todo) {
    subTodos.push(todo);
  }

  return {
    get id() {
      return id;
    },
    title,
    description,
    dueDate: new Date(dueDate),
    priority,
    isComplete,
    get notes() {
      return [...notes];
    },
    get subTodos() {
      return [...subTodos];
    },
    addNote,
    addSubTodo,
  };
}

const mytodo = TodoFactory({
  id: "1",
  title: "todo title",
  description: "todo description",
  dueDate: new Date(),
  priority: "1",
});

const mytodo2 = TodoFactory({
  id: "2",
  title: "todo title 2",
  description: "todo description 2",
  dueDate: new Date(),
  priority: "2",
});

const myProject = ProjectFactory({
  name: "myProject",
  todos: [mytodo, mytodo2],
});

console.log(myProject);

storageController.storeProject(myProject.name, myProject);

console.log(storageController.getProject(myProject.name, "todosArray"));

export { TodoFactory };
