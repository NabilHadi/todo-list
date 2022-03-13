function storeProject(projectName, project) {
  localStorage.setItem(projectName, JSON.stringify(project));
}

function getProject(projectName, todosKey) {
  const project = localStorage.getItem(projectName);
  if (!project) return null;

  return JSON.parse(project);
}

// JSON.parse(project, (key, value) => {
//   if (key === todosKey) {
//     value = value.map((todo) => {
//       return TodoFactory(todo);
//     });
//   }
//   return value;
// });

export default { storeProject, getProject };
