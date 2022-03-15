import { v4 as uuidv4 } from "uuid";

import Todo from "./factories/todo";
import Project from "./factories/project";
import StorgeManager from "./storage-controller";
import DisplayController from "./display-controller";
import ProjectsManager from "./project-manager";

DisplayController.renderMainLayout();

const mytodo = new Todo({
  id: uuidv4(),
  title: "todo title",
  description: "todo description",
  dueDate: new Date(),
  priority: "1",
});

const mytodo2 = new Todo({
  id: uuidv4(),
  title: "todo title 2",
  description: "todo description 2",
  dueDate: new Date(),
  priority: "2",
});

const defaultProject = new Project({
  id: uuidv4(),
  name: "Default Project",
  todos: [mytodo],
});

const anotherProject = new Project({
  id: uuidv4(),
  name: "Another Project",
  todos: [mytodo2],
});

StorgeManager.storeProjects([defaultProject, anotherProject]);
