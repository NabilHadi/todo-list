import "./style.css";
import magnifyIcon from "./assests/magnify.svg";
import plusIcon from "./assests/plus.svg";
import bellIcon from "./assests/bell.png";
import cogIcon from "./assests/cog.png";

const DisplayController = (function () {
  const contentDiv = document.querySelector("#content");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("content-container");
  contentDiv.appendChild(containerDiv);

  function renderMainLayout() {
    containerDiv.append(getNavbarComponent());

    const sidebarDiv = document.createElement("div");
    sidebarDiv.classList.add("sidebar");
    containerDiv.append(sidebarDiv);

    const mainContentDiv = document.createElement("div");
    mainContentDiv.classList.add("main-content");
    containerDiv.append(mainContentDiv);
  }

  function getNavbarComponent() {
    const navbarDiv = document.createElement("div");
    navbarDiv.classList.add("navbar");

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
    searchBar.setAttribute("placeholder", "Quick find");
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

  return {
    renderMainLayout,
  };
})();

export default DisplayController;
