import "./style.css";
import magnifyIcon from "./assests/magnify.svg";
import plusIcon from "./assests/plus.svg";
import bellIcon from "./assests/bell.png";
import cogIcon from "./assests/cog.png";

import ProjectsManager from "./project-manager";

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
    const ul = document.createElement("ul");
    ul.classList.add("sidebar-projects-ul");
    sidebarDiv.append(ul);

    for (const project of projects) {
      const li = document.createElement("li");
      li.classList.add("project-item");
      li.dataset.projectId = project.id;
      li.textContent = project.name;
      li.addEventListener("click", (event) => {
        renderMainContentComponent(mainContentDiv, project);
      });
      ul.append(li);
    }

    return sidebarDiv;
  }

  function renderMainContentComponent(mainContentDiv, project) {
    mainContentDiv.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("main-content-todos-ul");
    mainContentDiv.append(ul);

    if (!project) return mainContentDiv;

    for (const todo of project.todos) {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      li.dataset.todoId = todo.id;
      li.textContent = todo.title;
      ul.append(li);
    }

    return mainContentDiv;
  }

  return {
    renderMainLayout,
  };
})();

export default DisplayController;
