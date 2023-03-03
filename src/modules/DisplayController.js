import TodoListComponent from "./TodoListComponent";
import { createElement } from "./utils";
import * as Model from "./Model";
import TodoFormComponent from "./TodoFormComponent";
import ProjectForm from "./ProjectForm";

export default class DisplayController {
  constructor() {
    this.newTodoBtn = document.querySelector(".new-todo-btn");
    this.newProjectBtn = document.querySelector(".new-project-btn");
    this.projectsUL = document.querySelector(".projects-list");
    this.projectFormModal = document.querySelector(".project-modal");
    this.todoFormModal = document.querySelector(".todo-modal");

    this.currentProjectId = Model.getProjects()[0].id;

    // Add new Project
    this.newProjectBtn.addEventListener("click", () => {
      ProjectForm.renderAddingForm();
      this.projectFormModal.classList.add("show");
    });
    ProjectForm.addNewProjectListener((name) => {
      Model.addNewProject({ name });
      this.projectFormModal.classList.remove("show");
    });

    // Edit Project
    ProjectForm.addEditProjectListener((projectId, name) => {
      Model.editProject(projectId, { name }, false);
    });

    // Add new Todo
    this.todoFormComponent = new TodoFormComponent();
    this.newTodoBtn.addEventListener("click", () => {
      this.todoFormComponent.setFormAsNewTodo(
        this.currentProjectId,
        Model.getProjects()
      );
      this.todoFormModal.classList.add("show");
    });
    this.todoFormComponent.subToNewTodoEvent((data) => {
      Model.addNewTodo(
        {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          priority: data.priority,
          isComplete: data.isComplete,
        },
        data.projectId
      );
      this.todoFormModal.classList.remove("show");
    });

    //  Edit Todo
    this.todoFormComponent.subToEditTodoEvent((todoId, data) => {
      Model.editTodo(
        todoId,
        {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          priority: data.priority,
          isComplete: data.isComplete,
        },
        false
      );
      if (data.projectId !== this.currentProjectId) {
        Model.changeTodoProject(todoId, data.projectId);
      }
    });

    this.todoListComponent = new TodoListComponent();
    this.todoListComponent.setTodos(
      Model.getProjectTodos(this.currentProjectId)
    );
    this.todoListComponent.addTodoClickLisetner((todoId) => {
      this.todoFormComponent.setFormAsEditTodo(
        Model.getTodoById(todoId),
        this.currentProjectId,
        Model.getProjects()
      );
    });

    // Add Todo delete handler
    this.todoListComponent.addTodoDeleteClickListener((todoId) => {
      Model.editTodo(todoId, null, true);
    });

    // Rerender Todos list on current project's todos change
    Model.subToProjctEdit((data) => {
      if (data.projectId !== this.currentProjectId) return;

      this.todoListComponent.setTodos(
        Model.getProjectTodos(this.currentProjectId)
      );
    });

    // Rerender projects list on Project add
    Model.subToProjctAdd(() => {
      this.renderProjectsList(Model.getProjects());
    });

    // Reremder projects list on project edit
    Model.subToProjctEdit(() => {
      this.renderProjectsList(Model.getProjects());
    });

    this.handleProjectItemClick = this.handleProjectItemClick.bind(this);
    this.projectsUL.addEventListener("click", this.handleProjectItemClick);

    window.addEventListener("click", (event) => {
      if (event.target == this.projectFormModal) {
        this.projectFormModal.classList.remove("show");
      } else if (event.target == this.todoFormModal) {
        this.todoFormModal.classList.remove("show");
      }
    });
  }

  handleProjectItemClick(event) {
    const projectId = event.target.dataset.id;
    if (!projectId) return;

    if (event.target.classList.contains("project-edit-btn")) {
      const project = Model.getProjects().find((p) => p.id === projectId);
      if (!project) return;

      ProjectForm.renderEditingForm(project);
    } else if (event.target.classList.contains("project-delete-btn")) {
      const project = Model.getProjects().find((p) => p.id === projectId);
      Model.editProject(project.id, null, true);
    } else {
      const projectTodos = Model.getProjectTodos(projectId);
      if (!projectTodos) return;
      if (this.currentProjectId === projectId) return;

      this.currentProjectId = projectId;
      this.renderProjectsList(Model.getProjects());
      this.todoListComponent.setTodos(projectTodos);
    }
  }

  renderProjectsList(projects = []) {
    const listItems = projects.map((p) => {
      return createElement({
        tag: "li",
        children: [
          createElement({
            tag: "button",
            classNames: [
              "project-item",
              "btn",
              `${p.id === this.currentProjectId ? "current-project" : ""}`,
            ],
            textContent: `${p.name}`,
            dataset: {
              id: `${p.id}`,
            },
          }),
          createElement({
            tag: "button",
            classNames: ["btn", "project-edit-btn"],
            textContent: `Edit`,
            dataset: {
              id: `${p.id}`,
            },
          }),
          createElement({
            tag: "button",
            classNames: ["btn", "project-delete-btn"],
            textContent: `Delete`,
            dataset: {
              id: `${p.id}`,
            },
          }),
        ],
      });
    });
    this.projectsUL.innerHTML = "";
    this.projectsUL.append(...listItems);
  }
}
