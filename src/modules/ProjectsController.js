/**
 * ProjectsController Responsibilities
 * - create/delete projects
 * - create/delete todos
 * - assign todos to projects
 * - modify todos
 * - modify projects
 */
export default class ProjectsController {
  constructor(projects = [], freeTodos = []) {
    this.projects = projects;
    this.defaultProject = new Project("default", freeTodos);
  }

  getProjectByTodoId(todoId) {
    return [this.defaultProject, ...this.projects].find((project) => {
      return project.todos.find((t) => t.id === todoId);
    });
  }

  getProjectById(projectId) {
    return [this.defaultProject, ...this.projects].find(
      (project) => project.id === projectId
    );
  }

  getTodoById(todoId) {
    let todo = this.defaultProject.todos.find((t) => t.id === todoId);
    if (todo) return todo;

    this.projects.find((p) =>
      p.todos.find((t) => {
        if (t.id === todoId) {
          todo = t;
          return true;
        }
      })
    );

    return todo;
  }

  createProject(name = "", todos = []) {
    const newProject = new Project(name, todos);
    this.projects.push(newProject);
    return newProject.id;
  }

  createTodo(
    title = "",
    description = "",
    dueDate = "",
    priority = 0,
    projectId
  ) {
    const newTodo = new Todo(title, description, dueDate, priority);
    if (!projectId) {
      this.defaultProject.todos.push(newTodo);
    } else {
      const project = this.getProjectById(projectId);
      if (project) {
        project.todos.push(newTodo);
      } else {
        this.defaultProject.todos.push(newTodo);
      }
    }
    return newTodo.id;
  }

  deleteProject(projectId, deleteTodos = false) {
    const projectToDelete = this.getProjectById(projectId);
    if (!projectToDelete) return false;

    if (deleteTodos) {
      this.projects = this.projects.filter(
        (project) => project.id !== projectToDelete.id
      );
    } else {
      this.projects = this.projects.filter((project) => {
        if (project.id !== projectToDelete.id) {
          this.defaultProject.todos.push(...project.todos);
          return false;
        }
        return true;
      });
    }
    return projectToDelete.id;
  }

  deleteTodos(todoId) {
    const todoProject = this.getProjectByTodoId(todoId);
    if (!todoProject) return false;

    todoProject.todos = todoProject.todos.filter((t) => t.id !== todoId);
    return todoProject.id;
  }

  changeProjectName(projectId, newName) {
    const project = this.getProjectById(projectId);
    if (!project) return false;

    project.name = newName;
    return true;
  }

  changeTodoTile(todoId, newTitle) {
    const todo = this.getTodoById(todoId);
    if (!todo) return false;

    todo.title = newTitle;
    return true;
  }

  changeTodoDescription(todoId, newDescription) {
    const todo = this.getTodoById(todoId);
    if (!todo) return false;

    todo.description = newDescription;
    return true;
  }

  changeTodoDueDate(todoId, newDueDate) {
    const todo = this.getTodoById(todoId);
    if (!todo) return false;

    todo.dueDate = newDueDate;
    return true;
  }

  changeTodoPriority(todoId, newPriority) {
    const todo = this.getTodoById(todoId);
    if (!todo) return false;

    todo.priority = newPriority;
    return true;
  }
}
