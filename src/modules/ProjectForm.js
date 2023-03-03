const ProjectForm = (function () {
  const module = {};
  const form = document.querySelector(".project-form");
  const nameInput = form.querySelector("#project__name");
  const submitBtn = form.querySelector("button");

  let newProjectEventListeners = [];
  let editProjectEventListeners = [];

  module.addNewProjectListener = (listener) => {
    newProjectEventListeners.push(listener);
  };
  module.removeNewProjectListener = (listener) => {
    newProjectEventListeners = newProjectEventListeners.filter(
      (lis) => lis !== listener
    );
  };

  module.addEditProjectListener = (listener) => {
    editProjectEventListeners.push(listener);
  };
  module.removeEditProjectListener = (listener) => {
    editProjectEventListeners = editProjectEventListeners.filter(
      (lis) => lis !== listener
    );
  };

  module.renderAddingForm = () => {
    form.dataset.edit = "false";
    form.dataset.projectId = "";
    nameInput.value = "";
    submitBtn.text = "Add New Project";
  };

  module.renderEditingForm = (project) => {
    form.dataset.edit = "true";
    form.dataset.projectId = project.id;
    nameInput.value = project.name;
    submitBtn.textContent = "Edit Project";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.dataset.edit === "true") {
      const projectId = event.target.dataset.projectId;
      editProjectEventListeners.forEach((list) =>
        list(projectId, nameInput.value)
      );
    } else {
      newProjectEventListeners.forEach((list) => list(nameInput.value));
    }
  });

  return module;
})();

export default ProjectForm;
