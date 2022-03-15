const StorgeManager = (function () {
  const projectsKey = "projects";

  const storeProjects = (projects) => {
    localStorage.setItem(projectsKey, JSON.stringify(projects));
  };

  const getProjects = () => {
    return localStorage.getItem(projectsKey);
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  return {
    storeProjects,
    getProjects,
    clearStorage,
  };
})();

export default StorgeManager;
