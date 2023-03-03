import {
  randCatchPhrase,
  randFutureDate,
  randNumber,
  randProductDescription,
  randJobTitle,
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
    if (className === "") return;
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
    todos.push({
      title: randCatchPhrase(),
      description: randProductDescription(),
      dueDate: randFutureDate(),
      priority: randNumber({ min: 1, max: 5 }),
    });
  }

  return todos;
}

// Function to create random projects
function createFakeProjects(number) {
  const projects = [];
  for (let i = 0; i < number; i++) {
    projects.push({ name: randJobTitle(), todos: [...createFakeTodos(5)] });
  }

  return projects;
}

export { createElement, createFakeProjects };
