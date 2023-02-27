export default class TodoListComponent {
  constructor(currentTodos) {
    this._view = {
      init() {
        this.todoListCotnainer = document.querySelector(
          ".todos-list-container"
        );
        this.todoListUL = this.todoListCotnainer.querySelector(".todos-list");
        this.todoClickListeners = [];

        this.todoListUL.addEventListener("click", (e) => {
          const todoId = e.target.id;
          if (!todoId) return;

          this.todoClickListeners.forEach((listener) => listener(todoId));
        });
      },

      render(todos) {
        const listItems = todos.reduce(
          (html, todo) => html + this.todoTemplate(todo),
          ``
        );
        this.todoListUL.innerHTML = listItems;
      },

      todoTemplate(todo) {
        return `<li><button class="todo-item priority-${todo.priority} btn btn-round" id="${todo.id}">${todo.title}<span class="todo-duedate">${todo.dueDate}</span></button></li>`;
      },

      addTodoClickListener(handler) {
        this.todoClickListeners.push(handler);
      },
    };

    this._model = {
      init(todos = []) {
        this.todos = todos;
        this.changeListeners = [];
      },

      addChangeListener(listener) {
        this.changeListeners.push(listener);
      },

      removeChangeListener(listener) {
        this.changeListeners = this.changeListeners.filter(
          (l) => l !== listener
        );
      },

      triggerChange() {
        this.changeListeners.forEach((listener) => {
          listener(this.todos);
        });
      },

      addTodo(todo) {
        this.todos.push(todo);
        this.triggerChange();
      },

      removeTodo(todo) {
        this.todos = this.todo.filter((t) => t !== todo);
        this.triggerChange();
      },

      getTodos() {
        return this.todos;
      },

      setTodos(todos) {
        this.todos = todos;
        this.triggerChange();
      },
    };

    this._model.init(currentTodos);
    this._view.init();

    this.modelChangeHandler = this.modelChangeHandler.bind(this);
    this._model.addChangeListener(this.modelChangeHandler);
  }

  modelChangeHandler(todos) {
    this._view.render(todos);
  }

  setTodos(todos) {
    this._model.setTodos(todos);
  }

  addTodoClickLisetner(handler) {
    this._view.addTodoClickListener(handler);
  }
}
