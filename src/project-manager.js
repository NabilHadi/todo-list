import { v4 as uuidv4 } from "uuid";

import { parseProjects } from "./factories/project";
import StorgeManager from "./storage-controller";
import Todo from "./factories/todo";
import Project from "./factories/project";

const ProjectsManager = (function () {
  const storedProjects = parseProjects(JSON.parse(StorgeManager.getProjects()));
  const projectsArray = storedProjects ? storedProjects : getDefaultProjets();
  console.log(projectsArray);

  const addProject = (project) => {
    projectsArray.push(project);
    updateStorage();
  };

  const deleteProject = (projectId) => {
    const projectIndex = projectsArray.findIndex((p) => {
      return p.id === projectId;
    });
    if (projectIndex !== -1) {
      projectsArray.splice(projectIndex, 1);
    }
    updateStorage();
    return projectIndex;
  };

  const getProjectWithId = (projectId) => {
    return projectsArray.find((p) => {
      return p.id === projectId;
    });
  };

  const deleteTodo = (todo) => {
    projectsArray.forEach((proj) => {
      proj.removeTodo(todo.id);
    });
    updateStorage();
  };

  const updateStorage = () => {
    if (projectsArray.length === 0) {
      StorgeManager.clearStorage();
      return;
    }
    StorgeManager.storeProjects(projectsArray);
  };

  function getDefaultProjets() {
    const mytodo = new Todo({
      id: uuidv4(),
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos natus laudantium doloremque tempora fuga atque ipsam ipsum illo sapiente, accusantium fugit animi, praesentium ab culpa libero, ad enim perferendis hic!",
      dueDate: new Date(),
      priority: "1",
    });

    const mytodo2 = new Todo({
      id: uuidv4(),
      title: "ipsum lorem",
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

    return [defaultProject, anotherProject];
  }

  return {
    get projectsArray() {
      return [...projectsArray];
    },
    addProject,
    deleteProject,
    getProjectWithId,
    deleteTodo,
    updateStorage,
  };
})();

export default ProjectsManager;
