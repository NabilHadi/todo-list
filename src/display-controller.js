import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ProjectsManager from "./project-manager";

import "./style.css";
import magnifyIcon from "./assests/magnify.svg";
import plusIcon from "./assests/plus.svg";
import bellIcon from "./assests/bell.png";
import cogIcon from "./assests/cog.png";
import TodoView from "./todo-view";
import Todo from "./factories/todo";
import { el } from "date-fns/locale";
import Project from "./factories/project";

const DisplayController = (function () {
  const contentDiv = document.querySelector("#content");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("content-container");
  contentDiv.appendChild(containerDiv);

  const navbarDiv = document.createElement("div");
  navbarDiv.classList.add("navbar");

  const sidebarDiv = document.createElement("div");
  sidebarDiv.classList.add("sidebar");

  const mainContentDiv = document.createElement("div");
  mainContentDiv.classList.add("main-content");

  function renderMainLayout() {
    containerDiv.append(renderNavbarComponent(navbarDiv));

    containerDiv.append(
      renderSidebarComponent(sidebarDiv, ProjectsManager.projectsArray)
    );

    containerDiv.append(
      renderMainContentComponent(
        mainContentDiv,
        ProjectsManager.projectsArray[0]
      )
    );
  }

  function renderNavbarComponent(navbarDiv) {
    const brandName = document.createElement("h1");
    brandName.classList.add("brand-name");
    brandName.textContent = "TODO LIST";
    navbarDiv.append(brandName);

    const navbarUtilitesContainer = document.createElement("div");
    navbarUtilitesContainer.classList.add("navbar-utilites-container");
    navbarDiv.append(navbarUtilitesContainer);

    const searchBarContainer = document.createElement("div");
    searchBarContainer.classList.add("search-bar-container");
    navbarUtilitesContainer.append(searchBarContainer);

    const searchBarIcon = document.createElement("img");
    searchBarIcon.classList.add("search-bar-icon");
    searchBarIcon.setAttribute("src", magnifyIcon);
    searchBarContainer.append(searchBarIcon);

    const searchBar = document.createElement("input");
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute(
      "placeholder",
      "A search bar, doesn't work but looks nice"
    );
    searchBar.classList.add("search-bar-input");
    searchBarContainer.append(searchBar);

    const navbarBtnsContainer = document.createElement("div");
    navbarBtnsContainer.classList.add("navbar-btns-container");
    navbarUtilitesContainer.append(navbarBtnsContainer);

    const addTodoBtn = document.createElement("img");
    addTodoBtn.classList.add("add-todo-btn", "icon-btn");
    addTodoBtn.setAttribute("src", plusIcon);
    navbarBtnsContainer.append(addTodoBtn);

    const notificationBtn = document.createElement("img");
    notificationBtn.classList.add("notification-btn", "icon-btn");
    notificationBtn.setAttribute("src", bellIcon);
    navbarBtnsContainer.append(notificationBtn);

    const settingsBtn = document.createElement("img");
    settingsBtn.classList.add("settings-btn", "icon-btn");
    settingsBtn.setAttribute("src", cogIcon);
    navbarBtnsContainer.append(settingsBtn);

    return navbarDiv;
  }

  function renderSidebarComponent(sidebarDiv, projects) {
    sidebarDiv.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("sidebar-projects-ul");
    sidebarDiv.append(ul);

    for (const project of projects) {
      const li = document.createElement("li");
      li.classList.add("project-item", "btn");
      li.dataset.projectId = project.id;
      li.textContent = project.name;
      li.addEventListener("click", (event) => {
        renderMainContentComponent(mainContentDiv, project);
      });

      const deleteBtn = createHTMLElement({
        elementType: "span",
        textContent: "X",
        classList: ["project-delete-btn"],
      });
      deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        ProjectsManager.deleteProject(project.id);
        li.remove();
        renderMainContentComponent(mainContentDiv);
      });
      li.append(deleteBtn);
      ul.append(li);
    }

    const newProjectLi = createHTMLElement({
      elementType: "li",
      classList: ["project-item", "btn"],
    });
    const newProjectInput = createHTMLElement({ elementType: "input" });
    newProjectLi.append(newProjectInput);
    const newProjectBtn = createHTMLElement({
      elementType: "span",
      textContent: "+",
      classList: ["project-add-btn"],
    });

    newProjectBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      if (newProjectInput.value === "") {
        newProjectInput.classList.add("error-input");
        return;
      }
      newProjectInput.classList.remove("error-input");
      ProjectsManager.addProject(new Project({ name: newProjectInput.value }));
      renderSidebarComponent(sidebarDiv, ProjectsManager.projectsArray);
    });
    newProjectLi.append(newProjectBtn);
    ul.append(newProjectLi);

    return sidebarDiv;
  }

  function renderMainContentComponent(mainContentDiv, project) {
    mainContentDiv.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("main-content-todos-ul");
    mainContentDiv.append(ul);

    if (!project) return mainContentDiv;

    const form = newTodoForm();
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const dataObj = {};
      for (const [key, value] of formData) {
        console.log(key, value);
        dataObj[key] = value;
      }

      const newTodo = new Todo(dataObj);
      project.addTodo(newTodo);
      const newTodoView = new TodoView(newTodo);
      ul.append(newTodoView.createTodoView("li"));
      ProjectsManager.updateStorage();
      event.target.reset();
    });

    ul.append(form);

    for (const todo of project.todos) {
      const todoView = new TodoView(todo);
      ul.append(todoView.createTodoView("li"));
    }

    return mainContentDiv;
  }

  function newTodoForm() {
    const form = createHTMLElement({
      elementType: "form",
      classList: ["new-todo-form", "todo-item"],
    });

    const titleLabel = createHTMLElement({
      elementType: "label",
      classList: ["form-label", "title-label"],
      textContent: "Title: ",
    });
    form.append(titleLabel);

    const titleInput = createHTMLElement({
      elementType: "input",
      classList: ["form-input", "title-input"],
      attributes: { type: "text", name: "title", required: "" },
    });
    form.append(titleInput);

    const descriptionLabel = createHTMLElement({
      elementType: "label",
      classList: ["form-label", "description-label"],
      textContent: "Description: ",
    });
    form.append(descriptionLabel);

    const descriptionInput = createHTMLElement({
      elementType: "textarea",
      classList: ["form-input", "description-input"],
      attributes: { name: "description" },
    });
    form.append(descriptionInput);

    const dateInput = createHTMLElement({
      elementType: "input",
      classList: ["form-input", "date-input"],
      attributes: {
        type: "date",
        name: "dueDate",
        required: "",
      },
    });
    form.append(dateInput);

    const priortyInput = createHTMLElement({
      elementType: "input",
      classList: ["form-input", "priorty-input"],
      attributes: {
        type: "number",
        placeholder: "Priority",
        name: "priority",
        min: "1",
        value: "1",
      },
    });
    form.append(priortyInput);

    const submitBtn = createHTMLElement({
      elementType: "button",
      classList: ["form-button", "btn"],
      attributes: { type: "submit" },
      textContent: "ADD",
    });
    form.append(submitBtn);

    return form;
  }

  return {
    renderMainLayout,
  };
})();

export function createHTMLElement({
  elementType = "div",
  classList = [],
  textContent = "",
  attributes = {},
}) {
  const elm = document.createElement(elementType);
  elm.classList.add(...classList);
  elm.textContent = textContent;
  for (const key of Object.keys(attributes)) {
    elm.setAttribute(key, attributes[key]);
  }
  return elm;
}

export default DisplayController;
