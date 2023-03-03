export default class TodoListComponent {
  constructor() {
    this._view = {
      todoClickListeners: [],
      todoDeleteBtnListeners: [],
      init() {
        this.todoListCotnainer = document.querySelector(
          ".todos-list-container"
        );
        this.todoListUL = this.todoListCotnainer.querySelector(".todos-list");

        this.todoListUL.addEventListener("click", (e) => {
          const todoId = e.target.dataset.id;
          if (!todoId) return;
          if (e.target.classList.contains("delete-btn")) {
            this.todoDeleteBtnListeners.forEach((listener) => listener(todoId));
          } else {
            this.todoClickListeners.forEach((listener) => listener(todoId));
          }
        });
      },

      render(todos) {
        const listItems = todos
          .sort((t1, t2) => t2.priority - t1.priority)
          .reduce((html, todo) => html + this.todoTemplate(todo), ``);
        this.todoListUL.innerHTML = listItems;
      },

      todoTemplate(todo) {
        return `<li><button class="todo-item priority-${todo.priority} btn  ${
          todo.isComplete ? "todo-complete" : ""
        }" data-id="${todo.id}">${todo.title}<span class="todo-duedate">${
          todo.dueDate
        }</span></button> <button class="btn delete-btn" data-id="${
          todo.id
        }">DEL</button></li>`;
      },

      addTodoClickListener(handler) {
        this.todoClickListeners.push(handler);
      },

      addTodoDeleteClickListener(handler) {
        this.todoDeleteBtnListeners.push(handler);
      },
    };

    this._model = {
      todos: [],
      changeListeners: [],

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

      getTodos() {
        return this.todos;
      },

      setTodos(todos) {
        this.todos = todos;
        this.triggerChange();
      },
    };

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

  addTodoDeleteClickListener(handler) {
    this._view.addTodoDeleteClickListener(handler);
  }
}
