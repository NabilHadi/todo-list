import { createHTMLElement } from "./display-controller";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ProjectsManager from "./project-manager";

export default class TodoView {
  constructor(todoObj) {
    this.todoObj = todoObj;
  }

  createTodoView(containerElementType) {
    const li = createHTMLElement({
      elementType: containerElementType,
      classList: ["todo-item"],
    });
    li.dataset.todoId = this.todoObj.id;

    const todoHeaderDiv = createHTMLElement({
      classList: ["todo-item-header"],
      textContent: this.todoObj.title,
    });
    li.append(todoHeaderDiv);

    const todoDescripDiv = createHTMLElement({
      classList: ["todo-item-descrip"],
      textContent: this.todoObj.description,
    });
    li.append(todoDescripDiv);

    const todoDueDateDiv = createHTMLElement({
      classList: ["todo-item-duedate"],
      textContent: format(parseISO(this.todoObj.dueDate), "Pp"),
    });
    li.append(todoDueDateDiv);

    const todoPriorty = createHTMLElement({
      classList: ["todo-item-priority"],
      textContent: "Priority: " + this.todoObj.priority,
    });
    li.append(todoPriorty);

    if (this.todoObj.isComplete) {
      li.classList.add("completed-todo");
    }

    const todoToggleBtn = createHTMLElement({
      classList: ["btn", "toggle-btn"],
      textContent: "Change Status",
    });

    todoToggleBtn.addEventListener("click", (event) => {
      if (this.todoObj.toggleCompleteState()) {
        li.classList.add("completed-todo");
      } else {
        li.classList.remove("completed-todo");
      }
      ProjectsManager.updateStorage();
    });
    li.append(todoToggleBtn);

    const todoDeleteBtn = createHTMLElement({
      classList: ["btn", "delete-btn"],
      textContent: "DELETE",
    });

    todoDeleteBtn.addEventListener("click", (event) => {
      ProjectsManager.deleteTodo(this.todoObj);
      this.todoObj = null;
      li.remove();
    });
    li.append(todoDeleteBtn);

    return li;
  }
}
