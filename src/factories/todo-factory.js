const todoProto = {
  addNote(note) {
    this.notes.push(note);
  },

  addSubTodo(todo) {
    this.subTodos.push(todo);
  },
};

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
  const todo = Object.assign(Object.create(todoProto), {
    id,
    title,
    description,
    dueDate,
    priority,
    isComplete,
    notes,
    subTodos,
  });

  return todo;
}

function parseTodos(todosArray) {
  const parsedTodos = [];
  for (const todo of todosArray) {
    parsedTodos.push(TodoFactory(todo));
  }
  return parsedTodos;
}

export { parseTodos };
