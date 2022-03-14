import { parseProjects } from "./factories/project-factory";
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

  return {
    get projectsArray() {
      return [...projectsArray];
    },
    addProject,
    deleteProject,
    getProjectWithId,
  };
})();

export default ProjectsManager;