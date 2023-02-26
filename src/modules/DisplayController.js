import { createElement } from "./utils";

// TODO: Add event Handlers
// TODO: Create forms for: 1- adding new project, 2- adding new todo, 3- Editing Todo, 4- Editing Project

export default class DisplayController {
  constructor(currentProject, projectsController) {
    this.newTodoBtn = document.querySelector(".new-todo-btn");
    this.newProjectBtn = document.querySelector(".new-project-btn");
    this.projectsUL = document.querySelector(".projects-list");
    this.todosUL = document.querySelector(".todos-list");
    this.currentProject = currentProject;
    this.projectsController = projectsController;

    this.handleProjectItemClick = this.handleProjectItemClick.bind(this);
  }

  handleProjectItemClick(event) {
    const projectId = event.target.id;
    const newProject = this.projectsController.getProjectById(projectId);
    if (!newProject) return;

    this.renderTodos(newProject);
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
