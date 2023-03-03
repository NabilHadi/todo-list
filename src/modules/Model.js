import { v4 as uuid } from "uuid";
import { createFakeProjects } from "./utils";

class Project {
  constructor({ name = "", todos = [] }) {
    this.id = uuid();
    this.name = name;
    this.todos = todos;
  }
}

class Todo {
  constructor({
    title = "",
    description = "",
    dueDate = "",
    priority = 0,
    isComplete = false,
  }) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.isComplete = isComplete;
  }
}

// Main Data
let projects = [];

// Lists of subscribers
let newProjectAddSubs = [];
let newTodoAddSubs = [];
let editProjectSubs = [];
let editTodoSubs = [];

// Adding new Data

function addNewProject({ name = "", todos = [] }) {
  const newProject = new Project({ name, todos });
  projects.push(newProject);

  newProjectAddSubs.forEach((lis) => lis({ projectId: newProject.id }));
}

function addNewTodo(
  {
    title = "",
    description = "",
    dueDate = "",
    priority = 0,
    isComplete = false,
  },
  projectId
) {
  const foundProject = projects.find((p) => p.id === projectId);
  if (!foundProject) return;

  const newTodo = new Todo({
    title,
    description,
    dueDate,
    priority,
    isComplete,
  });

  foundProject.todos.push(newTodo);
  newTodoAddSubs.forEach((lis) => lis({ todoId: newTodo.id, projectId }));
  editProjectSubs.forEach((lis) => lis({ todoId: newTodo.id, projectId }));
}

// Editing Data

function editProject(projectId, newProjectState = {}, isDelete = false) {
  const foundProject = projects.find((p) => p.id === projectId);
  if (!foundProject) return;

  if (isDelete) {
    projects = projects.filter((p) => p.id !== foundProject.id);
  } else {
    Object.assign(foundProject, newProjectState);
  }

  editProjectSubs.forEach((lis) =>
    lis({ projectId: foundProject.id, isDelete })
  );
}

function editTodo(todoId, newTodoState = {}, isDelete = false) {
  const result = findTodoById(todoId);
  if (!result.todo) return;

  if (isDelete) {
    result.project.todos = result.project.todos.filter(
      (t) => t.id !== result.todo.id
    );
  } else {
    Object.assign(result.todo, newTodoState);
  }

  editTodoSubs.forEach((lis) => lis({ todoId: result.todo.id }));
  editProjectSubs.forEach((lis) =>
    lis({ projectId: result.project.id, todoId: result.todo.id, isDelete })
  );
}

function changeTodoProject(todoId, newProjectId) {
  const result = findTodoById(todoId);
  if (!result.todo) return;
  if (result.project.id === newProjectId) return;

  editTodo(todoId, null, true);

  const foundProject = projects.find((p) => p.id === newProjectId);
  if (!foundProject) return;

  addNewTodo(result.todo, foundProject.id);
}

// Add/Remove listeners

function subToProjctAdd(listener) {
  newProjectAddSubs.push(listener);
}

function unSubFromProjectAdd(listener) {
  newProjectAddSubs = newProjectAddSubs.filter((s) => s !== listener);
}

function subToTodoAdd(listener) {
  newTodoAddSubs.push(listener);
}

function unSubFromTodoAdd(listener) {
  newTodoAddSubs = newTodoAddSubs.filter((s) => s !== listener);
}

function subToProjctEdit(listener) {
  editProjectSubs.push(listener);
}

function unSubFromProjectEdit(listener) {
  editProjectSubs = editProjectSubs.filter((s) => s !== listener);
}

function subToTodoEdit(listener) {
  editTodoSubs.push(listener);
}

function unSubFromTodoEdit(listener) {
  editTodoSubs = editTodoSubs.filter((s) => s !== listener);
}

// Helper functions

function findTodoById(todoId) {
  let foundTodo = null;
  let foundProject = projects.find((p) => {
    return p.todos.find((t) => {
      if (t.id === todoId) {
        foundTodo = t;
        return true;
      }
    });
  });

  return { todo: foundTodo, project: foundProject };
}

function getProjects() {
  return projects.map((p) => {
    return {
      id: p.id,
      name: p.name,
      todos: getProjectTodos(p.id),
    };
  });
}

function getProjectTodos(projectId) {
  const foundProject = projects.find((p) => p.id === projectId);
  if (!foundProject) return null;

  return foundProject.todos.map((t) => {
    return { ...t };
  });
}

function getTodoById(todoId) {
  const result = findTodoById(todoId);
  if (!result.todo) return null;

  return { ...result.todo };
}

function initProjectsList() {
  let projectsJsonObjecs = JSON.parse(localStorage.getItem("projects"));
  if (!projectsJsonObjecs) {
    projectsJsonObjecs = createFakeProjects(5);
  }

  projects = projectsJsonObjecs.map((pObj) => {
    const p = new Project({
      name: pObj.name,
      todos: pObj.todos.map((tObj) => {
        const t = new Todo({ ...tObj });
        if (tObj.id) t.id = tObj.id;
        return t;
      }),
    });
    if (pObj.id) p.id = pObj.id;
    return p;
  });
}

// Store projects in local storage
function storeProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// logic

initProjectsList();

subToProjctAdd(storeProjects);
subToProjctEdit(storeProjects);

// Exports

export {
  Todo,
  Project,
  addNewProject,
  addNewTodo,
  editProject,
  editTodo,
  subToProjctAdd,
  subToTodoAdd,
  unSubFromProjectAdd,
  unSubFromTodoAdd,
  subToProjctEdit,
  subToTodoEdit,
  unSubFromProjectEdit,
  unSubFromTodoEdit,
  getProjects,
  getProjectTodos,
  getTodoById,
  changeTodoProject,
};
