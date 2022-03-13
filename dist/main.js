/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/storage-controller.js":
/*!***********************************!*\
  !*** ./src/storage-controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ storeProject, getProject });


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoFactory": () => (/* binding */ TodoFactory)
/* harmony export */ });
/* harmony import */ var _storage_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage-controller */ "./src/storage-controller.js");


function ProjectFactory({ name, todos }) {
  const todosArray = [...todos];

  function addTodo(todo) {
    todosArray.push(todo);
  }

  function removeTodo(todo) {
    todosArray.filter((t) => {
      return todo !== t;
    });
  }

  function getTodoWithId(id) {
    return todosArray.find((t) => {
      return t.id === id;
    });
  }

  function getAllTodos() {
    return [...todosArray];
  }

  function emptyTodoArray() {
    todosArray.length = 0;
  }

  function toJSON() {
    return { name, todosArray };
  }

  return {
    name,
    addTodo,
    removeTodo,
    getTodoWithId,
    getAllTodos,
    emptyTodoArray,
    toJSON,
  };
}

function TodoFactory({
  id,
  title,
  description,
  dueDate,
  priority,
  isComplete = false,
  notes = [],
  subTodos = [],
}) {
  function addNote(note) {
    notes.push(note);
  }

  function addSubTodo(todo) {
    subTodos.push(todo);
  }

  return {
    get id() {
      return id;
    },
    title,
    description,
    dueDate: new Date(dueDate),
    priority,
    isComplete,
    get notes() {
      return [...notes];
    },
    get subTodos() {
      return [...subTodos];
    },
    addNote,
    addSubTodo,
  };
}

const mytodo = TodoFactory({
  id: "1",
  title: "todo title",
  description: "todo description",
  dueDate: new Date(),
  priority: "1",
});

const mytodo2 = TodoFactory({
  id: "2",
  title: "todo title 2",
  description: "todo description 2",
  dueDate: new Date(),
  priority: "2",
});

const myProject = ProjectFactory({
  name: "myProject",
  todos: [mytodo, mytodo2],
});

console.log(myProject);

_storage_controller__WEBPACK_IMPORTED_MODULE_0__["default"].storeProject(myProject.name, myProject);

console.log(_storage_controller__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(myProject.name, "todosArray"));



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsSUFBSTs7QUFFSixpRUFBZSxFQUFFLDBCQUEwQixFQUFDOzs7Ozs7O1VDcEI1QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnFEOztBQUVyRCwwQkFBMEIsYUFBYTtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBLHdFQUE4Qjs7QUFFOUIsWUFBWSxzRUFBNEI7O0FBRWpCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0b3JhZ2UtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc3RvcmVQcm9qZWN0KHByb2plY3ROYW1lLCBwcm9qZWN0KSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3ROYW1lLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0KSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3QocHJvamVjdE5hbWUsIHRvZG9zS2V5KSB7XG4gIGNvbnN0IHByb2plY3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9qZWN0TmFtZSk7XG4gIGlmICghcHJvamVjdCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIEpTT04ucGFyc2UocHJvamVjdCk7XG59XG5cbi8vIEpTT04ucGFyc2UocHJvamVjdCwgKGtleSwgdmFsdWUpID0+IHtcbi8vICAgaWYgKGtleSA9PT0gdG9kb3NLZXkpIHtcbi8vICAgICB2YWx1ZSA9IHZhbHVlLm1hcCgodG9kbykgPT4ge1xuLy8gICAgICAgcmV0dXJuIFRvZG9GYWN0b3J5KHRvZG8pO1xuLy8gICAgIH0pO1xuLy8gICB9XG4vLyAgIHJldHVybiB2YWx1ZTtcbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCB7IHN0b3JlUHJvamVjdCwgZ2V0UHJvamVjdCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgc3RvcmFnZUNvbnRyb2xsZXIgZnJvbSBcIi4vc3RvcmFnZS1jb250cm9sbGVyXCI7XG5cbmZ1bmN0aW9uIFByb2plY3RGYWN0b3J5KHsgbmFtZSwgdG9kb3MgfSkge1xuICBjb25zdCB0b2Rvc0FycmF5ID0gWy4uLnRvZG9zXTtcblxuICBmdW5jdGlvbiBhZGRUb2RvKHRvZG8pIHtcbiAgICB0b2Rvc0FycmF5LnB1c2godG9kbyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUb2RvKHRvZG8pIHtcbiAgICB0b2Rvc0FycmF5LmZpbHRlcigodCkgPT4ge1xuICAgICAgcmV0dXJuIHRvZG8gIT09IHQ7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUb2RvV2l0aElkKGlkKSB7XG4gICAgcmV0dXJuIHRvZG9zQXJyYXkuZmluZCgodCkgPT4ge1xuICAgICAgcmV0dXJuIHQuaWQgPT09IGlkO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QWxsVG9kb3MoKSB7XG4gICAgcmV0dXJuIFsuLi50b2Rvc0FycmF5XTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5VG9kb0FycmF5KCkge1xuICAgIHRvZG9zQXJyYXkubGVuZ3RoID0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4geyBuYW1lLCB0b2Rvc0FycmF5IH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYWRkVG9kbyxcbiAgICByZW1vdmVUb2RvLFxuICAgIGdldFRvZG9XaXRoSWQsXG4gICAgZ2V0QWxsVG9kb3MsXG4gICAgZW1wdHlUb2RvQXJyYXksXG4gICAgdG9KU09OLFxuICB9O1xufVxuXG5mdW5jdGlvbiBUb2RvRmFjdG9yeSh7XG4gIGlkLFxuICB0aXRsZSxcbiAgZGVzY3JpcHRpb24sXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBpc0NvbXBsZXRlID0gZmFsc2UsXG4gIG5vdGVzID0gW10sXG4gIHN1YlRvZG9zID0gW10sXG59KSB7XG4gIGZ1bmN0aW9uIGFkZE5vdGUobm90ZSkge1xuICAgIG5vdGVzLnB1c2gobm90ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTdWJUb2RvKHRvZG8pIHtcbiAgICBzdWJUb2Rvcy5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgaWQoKSB7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfSxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlOiBuZXcgRGF0ZShkdWVEYXRlKSxcbiAgICBwcmlvcml0eSxcbiAgICBpc0NvbXBsZXRlLFxuICAgIGdldCBub3RlcygpIHtcbiAgICAgIHJldHVybiBbLi4ubm90ZXNdO1xuICAgIH0sXG4gICAgZ2V0IHN1YlRvZG9zKCkge1xuICAgICAgcmV0dXJuIFsuLi5zdWJUb2Rvc107XG4gICAgfSxcbiAgICBhZGROb3RlLFxuICAgIGFkZFN1YlRvZG8sXG4gIH07XG59XG5cbmNvbnN0IG15dG9kbyA9IFRvZG9GYWN0b3J5KHtcbiAgaWQ6IFwiMVwiLFxuICB0aXRsZTogXCJ0b2RvIHRpdGxlXCIsXG4gIGRlc2NyaXB0aW9uOiBcInRvZG8gZGVzY3JpcHRpb25cIixcbiAgZHVlRGF0ZTogbmV3IERhdGUoKSxcbiAgcHJpb3JpdHk6IFwiMVwiLFxufSk7XG5cbmNvbnN0IG15dG9kbzIgPSBUb2RvRmFjdG9yeSh7XG4gIGlkOiBcIjJcIixcbiAgdGl0bGU6IFwidG9kbyB0aXRsZSAyXCIsXG4gIGRlc2NyaXB0aW9uOiBcInRvZG8gZGVzY3JpcHRpb24gMlwiLFxuICBkdWVEYXRlOiBuZXcgRGF0ZSgpLFxuICBwcmlvcml0eTogXCIyXCIsXG59KTtcblxuY29uc3QgbXlQcm9qZWN0ID0gUHJvamVjdEZhY3Rvcnkoe1xuICBuYW1lOiBcIm15UHJvamVjdFwiLFxuICB0b2RvczogW215dG9kbywgbXl0b2RvMl0sXG59KTtcblxuY29uc29sZS5sb2cobXlQcm9qZWN0KTtcblxuc3RvcmFnZUNvbnRyb2xsZXIuc3RvcmVQcm9qZWN0KG15UHJvamVjdC5uYW1lLCBteVByb2plY3QpO1xuXG5jb25zb2xlLmxvZyhzdG9yYWdlQ29udHJvbGxlci5nZXRQcm9qZWN0KG15UHJvamVjdC5uYW1lLCBcInRvZG9zQXJyYXlcIikpO1xuXG5leHBvcnQgeyBUb2RvRmFjdG9yeSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9