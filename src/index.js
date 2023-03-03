import "the-new-css-reset/css/reset.css";
import "./style.css";

import DisplayController from "./modules/DisplayController";
import * as Model from "./modules/Model";

const projects = Model.getProjects();

window.addEventListener("DOMContentLoaded", () => {
  const DC = new DisplayController();

  DC.renderProjectsList(projects);
});

globalThis.Model = Model;
