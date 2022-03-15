import { parseProjects } from "./factories/project";
import StorgeManager from "./storage-controller";

const ProjectsManager = (function () {
  const storedProjects = parseProjects(JSON.parse(StorgeManager.getProjects()));
  const projectsArray = storedProjects ? storedProjects : [];
  console.log(projectsArray);

  const addProject = (project) => {
    projectsArray.push(project);
  };

  const deleteProject = (projectId) => {
    const projectIndex = projectsArray.findIndex((p) => {
      return p.id === projectId;
    });
    if (projectIndex !== -1) {
      projectsArray.splice(projectIndex, 1);
    }
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
    StorgeManager.storeProjects(projectsArray);
  };

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
