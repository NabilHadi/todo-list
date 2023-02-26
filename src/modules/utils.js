import Project from "./Project";
import Todo from "./Todo";

import {
  randCatchPhrase,
  randFutureDate,
  randNumber,
  randProductDescription,
} from "@ngneat/falso";

function createElement({
  tag = "div",
  classNames = [],
  textContent,
  dataset = {},
  attributes = {},
  eventHandlers = {},
  children = [],
} = {}) {
  // Create elm with tag
  const elm = document.createElement(tag);

  // Add classes
  classNames.forEach((className) => {
    elm.classList.add(className);
  });

  // Set textContent
  if (textContent) {
    elm.textContent = textContent;
  }

  // Set dataset
  for (const key in dataset) {
    elm.dataset[key] = dataset[key];
  }

  // Set Attribuites
  for (const key in attributes) {
    elm.setAttribute(key, attributes[key]);
  }

  // Set Handlers
  for (const key in eventHandlers) {
    elm.addEventListener(key, eventHandlers[key]);
  }

  for (const child of children) {
    elm.appendChild(child);
  }

  return elm;
}

// function to create random todos
function createFakeTodos(number) {
  const todos = [];
  for (let i = 0; i < number; i++) {
    todos.push(
      new Todo({
        title: randCatchPhrase(),
        description: randProductDescription(),
        dueDate: randFutureDate(),
        priority: randNumber({ min: 1, max: 5 }),
      })
    );
  }

  return todos;
}

// Function to create random projects
function createFakeProjects(number) {
  const projects = [];
  for (let i = 0; i < number; i++) {
    projects.push(new Project(`Project ${i + 1}`, [...createFakeTodos(5)]));
  }

  return projects;
}

// Store projects in local storage
function storeProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Get projects from local storage and create project objects from them
function getProjects() {
  const projects = JSON.parse(localStorage.getItem("projects"));
  if (!projects) return createFakeProjects(4);

  return projects.map((p) => {
    const todos = p.todos.map((t) => new Todo({ ...t }));
    return new Project(p.name, todos);
  });
}

export { createElement, createFakeProjects, storeProjects, getProjects };
