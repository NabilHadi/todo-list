export default class TodoFormComponent {
  constructor() {
    this._view = (function () {
      const module = {};
      const form = document.querySelector(".todo-form");
      const titleInput = form.querySelector("#todo__title");
      const descriptionInput = form.querySelector("#todo__description");
      const dueDateInput = form.querySelector("#todo__dueDate");
      const priorityInput = form.querySelector("#todo__priority");
      const projectInput = form.querySelector("#todo__project");
      const isCompleteCheckBox = form.querySelector("#todo__isComplete");
      const submitBtn = form.querySelector("button");

      module.form = form;

      let submitListeners = [];

      module.addSubmitListener = (listener) => {
        submitListeners.push(listener);
      };
      module.removeSubmitListener = (listener) => {
        submitListeners = submitListeners.filter((lis) => lis !== listener);
      };

      module.renderAddingForm = (projectsList, currentProjectId) => {
        form.dataset.todoId = "";
        form.dataset.edit = "false";
        titleInput.value = "";
        descriptionInput.value = "";
        dueDateInput.valueAsDate = new Date();
        priorityInput.innerHTML = [1, 2, 3, 4, 5].map((num) => {
          return `<option value="${num}">${num}</option>`;
        });
        submitBtn.textContent = "Add Todo";
        projectInput.innerHTML = projectsList.map((project) => {
          return `<option value="${project.id}" ${
            currentProjectId == project.id ? "selected" : ""
          }>${project.name}</option>`;
        });
      };

      module.renderEditingForm = (todo, todoProjectId, projectsList) => {
        form.dataset.edit = "true";
        form.dataset.todoId = todo.id;
        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
        dueDateInput.valueAsDate = todo.dueDate;
        priorityInput.innerHTML = [1, 2, 3, 4, 5].map((num) => {
          return `<option value="${num}" ${
            num == todo.priority ? "selected" : ""
          }>${num}</option>`;
        });
        submitBtn.textContent = "Edit Todo";
        projectInput.innerHTML = projectsList.map((project) => {
          return `<option value="${project.id}" ${
            todoProjectId === project.id ? "selected" : ""
          }>${project.name}</option>`;
        });
      };

      module.getInputValues = () => {
        return {
          title: titleInput.value,
          description: descriptionInput.value,
          dueDate: dueDateInput.valueAsDate,
          priority: priorityInput.value,
          isComplete: isCompleteCheckBox.checked,
          projectId: projectInput.value,
        };
      };

      form.addEventListener("submit", handleSubmitEvent);
      function handleSubmitEvent(event) {
        submitListeners.forEach((lis) => lis(event));
      }

      return module;
    })();

    this.newTodoEventListeners = [];
    this.editTodoEventListeners = [];

    this.formSubmitListener = (event) => {
      event.preventDefault();
      let data = this._view.getInputValues();
      console.log(data, event.target.dataset.edit);

      if (event.target.dataset.edit === "true") {
        console.log("Here");
        const todoId = event.target.dataset.todoId;
        this.editTodoEventListeners.forEach((list) => list(todoId, data));
      } else {
        console.log("there");
        this.newTodoEventListeners.forEach((list) => list(data));
      }
    };

    this._view.addSubmitListener(this.formSubmitListener);
  }

  subToNewTodoEvent(handler) {
    this.newTodoEventListeners.push(handler);
  }

  subToEditTodoEvent(handler) {
    this.editTodoEventListeners.push(handler);
  }

  setFormAsNewTodo(projectId, projectsList) {
    this._view.renderAddingForm(projectsList, projectId);
  }

  setFormAsEditTodo(todo, todoProjectId, projectsList) {
    this._view.renderEditingForm(todo, todoProjectId, projectsList);
  }
}
