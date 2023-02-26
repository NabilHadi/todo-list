import { createElement } from "./utils";

// TODO: Add event Handlers
// TODO: Create forms for: 1- adding new project, 2- adding new todo, 3- Editing Todo, 4- Editing Project

const modal = (function () {
  const view = createElement({
    tag: "div",
    classNames: ["modal"],
    attributes: { id: "modal" },
  });

  const modalContent = createElement({
    tag: "div",
    classNames: ["modal-content"],
    attributes: {
      id: "modal-content",
    },
  });
  view.append(modalContent);

  const closeBtn = createElement({
    tag: "span",
    classNames: ["close"],
    textContent: "×",
  });
  modalContent.append(closeBtn);

  closeBtn.addEventListener("click", () => {
    hideModal();
  });

  view.addEventListener(
    "click",
    (e) => {
      if (view !== e.target) return;
      hideModal();
    },
    false
  );

  document.querySelector("#content").appendChild(view);

  function setContent(content = []) {
    modalContent.innerHTML = "";
    modalContent.append(closeBtn);

    modalContent.append(...content);
  }

  function showModal() {
    view.classList.add("show");
  }

  function hideModal() {
    view.classList.remove("show");
  }

  function getView() {
    return view;
  }

  return { setContent, showModal, hideModal, getView };
})();

// const TodoForm = (function () {})();

export default class DisplayController {
  constructor(currentProject, projectsController) {
    this.newTodoBtn = document.querySelector(".new-todo-btn");
    this.newProjectBtn = document.querySelector(".new-project-btn");
    this.projectsUL = document.querySelector(".projects-list");
    this.todosUL = document.querySelector(".todos-list");
    this.currentProject = currentProject;
    this.projectsController = projectsController;

    this.handleProjectItemClick = this.handleProjectItemClick.bind(this);
    this.handleNewTodoBtnClick = this.handleNewTodoBtnClick.bind(this);

    this.newTodoBtn.addEventListener("click", this.handleNewTodoBtnClick);

    modal.setContent([document.querySelector(".todo-form")]);
  }

  handleProjectItemClick(event) {
    const projectId = event.target.id;
    const newProject = this.projectsController.getProjectById(projectId);
    if (!newProject) return;

    this.renderTodos(newProject);
  }

  handleNewTodoBtnClick() {
    modal.showModal();
  }

  renderProjectsList(projects = []) {
    const listItems = projects.map((p) => {
      return createElement({
        tag: "li",
        children: [
          createElement({
            tag: "button",
            classNames: ["project-item", "btn"],
            textContent: `${p.name}`,
            attributes: { id: `${p.id}` },
            eventHandlers: {
              click: this.handleProjectItemClick,
            },
          }),
        ],
      });
    });
    this.projectsUL.innerHTML = "";
    this.projectsUL.append(...listItems);
  }

  renderTodos(project = null) {
    if (!project && !this.currentProject) return;

    if (project) {
      this.currentProject = project;
    }

    const listItems = this.currentProject.todos.map((t) => {
      return createElement({
        tag: "li",
        children: [
          createElement({
            tag: "button",
            classNames: [
              "todo-item",
              `priority-${t.priority}`,
              "btn",
              "btn-round",
            ],
            textContent: `${t.title}`,
            attributes: { id: `${t.id}` },
            children: [
              createElement({
                tag: "span",
                classNames: ["todo-duedate"],
                textContent: `${t.dueDate}`,
              }),
            ],
          }),
        ],
      });
    });

    this.todosUL.innerHTML = "";
    this.todosUL.append(...listItems);
  }
}
