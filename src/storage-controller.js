const StorgeManager = (function () {
  const projectsKey = "projects";

  const storeProjects = (projects) => {
    localStorage.setItem(projectsKey, JSON.stringify(projects));
  };

  const getProjects = () => {
    return localStorage.getItem(projectsKey);
  };

  return {
    storeProjects,
    getProjects,
  };
})();

export default StorgeManager;
