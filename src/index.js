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
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos natus laudantium doloremque tempora fuga atque ipsam ipsum illo sapiente, accusantium fugit animi, praesentium ab culpa libero, ad enim perferendis hic!",
  dueDate: new Date(),
  priority: "1",
});

const mytodo2 = new Todo({
  id: uuidv4(),
  title: "todo title 2",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas quis ipsum suspendisse ultrices gravida. Neque ornare aenean euismod elementum nisi quis eleifend.",
  dueDate: new Date(),
  priority: "2",
});

const mytodo3 = new Todo({
  id: uuidv4(),
  title: "todo title 3",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl purus in mollis nunc sed.",
  dueDate: new Date(),
  priority: "3",
  isComplete: true,
});

const defaultProject = new Project({
  id: uuidv4(),
  name: "Default Project",
  todos: [mytodo, mytodo3],
});

const anotherProject = new Project({
  id: uuidv4(),
  name: "Another Project",
  todos: [mytodo2],
});

// StorgeManager.storeProjects([defaultProject, anotherProject]);
