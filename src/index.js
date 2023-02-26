import "the-new-css-reset/css/reset.css";
import "./style.css";

import DisplayController from "./modules/DisplayController";
import { getProjects } from "./modules/utils";

const projects = getProjects();
console.log(projects);

window.addEventListener("DOMContentLoaded", () => {
  const DC = new DisplayController(projects[0]);

  DC.renderProjectsList(projects);
  DC.renderTodos();
});
