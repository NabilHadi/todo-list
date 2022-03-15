import { v4 as uuidv4 } from "uuid";

import Todo from "./factories/todo";
import Project from "./factories/project";
import StorgeManager from "./storage-controller";
import DisplayController from "./display-controller";
import ProjectsManager from "./project-manager";

DisplayController.renderMainLayout();
// StorgeManager.storeProjects([defaultProject, anotherProject]);
