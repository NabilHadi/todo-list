import "the-new-css-reset/css/reset.css";
import "./style.css";

import DisplayController from "./modules/DisplayController";
import { getProjects } from "./modules/utils";
import ProjectsController from "./modules/ProjectsController";

const projects = getProjects();
console.log(projects);

window.addEventListener("DOMContentLoaded", () => {
  const projectsController = new ProjectsController(projects);
  const DC = new DisplayController(projects[0], projectsController);

  DC.renderProjectsList(projects);
  DC.renderTodos();
});
