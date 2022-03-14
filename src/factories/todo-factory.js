export default function TodoFactory({
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

function parseTodos(todosArray) {
  const parsedTodos = [];
  for (const todo of todosArray) {
    parsedTodos.push(TodoFactory(todo));
  }
  return parsedTodos;
}

export { parseTodos };
