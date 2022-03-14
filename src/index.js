import { v4 as uuidv4 } from "uuid";

import TodoFactory from "./factories/todo-factory";
import ProjectFactory from "./factories/project-factory";
import StorgeManager from "./storage-controller";
import DisplayController from "./display-controller";
import ProjectsManager from "./project-manager";

DisplayController.renderMainLayout();

const mytodo = TodoFactory({
  id: uuidv4(),
  title: "todo title",
  description: "todo description",
  dueDate: new Date(),
  priority: "1",
});

const mytodo2 = TodoFactory({
  id: uuidv4(),
  title: "todo title 2",
  description: "todo description 2",
  dueDate: new Date(),
  priority: "2",
});

const defaultProject = ProjectFactory({
  id: uuidv4(),
  name: "defaultProject",
  todos: [mytodo],
});

const anotherProject = ProjectFactory({
  id: uuidv4(),
  name: "anotherProject",
  todos: [mytodo2],
});

StorgeManager.storeProjects([defaultProject, anotherProject]);
