/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/factories/project-factory.js":
/*!******************************************!*\
  !*** ./src/factories/project-factory.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectFactory),
/* harmony export */   "parseProjects": () => (/* binding */ parseProjects)
/* harmony export */ });
/* harmony import */ var _todo_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-factory */ "./src/factories/todo-factory.js");


function ProjectFactory({ id, name, todos }) {
  const todosArray = [...todos];

  function addTodo(todo) {
    todosArray.push(todo);
  }

  function removeTodo(todoid) {
    const todoIndex = todosArray.findIndex((t) => {
      t.id === todoid;
    });
    if (todoIndex !== -1) {
      todosArray.splice(todoIndex, 1);
    }
    return todoIndex;
  }

  function getTodoWithId(todoId) {
    return todosArray.find((t) => {
      return t.id === todoId;
    });
  }

  function emptyTodoArray() {
    todosArray.length = 0;
  }

  return {
    get id() {
      return id;
    },
    get todosArray() {
      return [...todosArray];
    },
    name,
    addTodo,
    removeTodo,
    getTodoWithId,
    emptyTodoArray,
  };
}

function parseProjects(projectsArray) {
  if (!projectsArray) return;
  const parsedProjects = [];
  for (const project of projectsArray) {
    parsedProjects.push(
      ProjectFactory({
        id: project.id,
        name: project.name,
        todos: (0,_todo_factory__WEBPACK_IMPORTED_MODULE_0__.parseTodos)(project.todosArray),
      })
    );
  }
  return parsedProjects;
}




/***/ }),

/***/ "./src/factories/todo-factory.js":
/*!***************************************!*\
  !*** ./src/factories/todo-factory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoFactory),
/* harmony export */   "parseTodos": () => (/* binding */ parseTodos)
/* harmony export */ });
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

function parseTodos(todosArray) {
  const parsedTodos = [];
  for (const todo of todosArray) {
    parsedTodos.push(TodoFactory(todo));
  }
  return parsedTodos;
}




/***/ }),

/***/ "./src/project-manager.js":
/*!********************************!*\
  !*** ./src/project-manager.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_project_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/project-factory */ "./src/factories/project-factory.js");
/* harmony import */ var _storage_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage-controller */ "./src/storage-controller.js");



const ProjectsManager = (function () {
  const storedProjects = (0,_factories_project_factory__WEBPACK_IMPORTED_MODULE_0__.parseProjects)(JSON.parse(_storage_controller__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects()));
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectsManager);


/***/ }),

/***/ "./src/storage-controller.js":
/*!***********************************!*\
  !*** ./src/storage-controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StorgeManager);


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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _factories_todo_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/todo-factory */ "./src/factories/todo-factory.js");
/* harmony import */ var _factories_project_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/project-factory */ "./src/factories/project-factory.js");
/* harmony import */ var _storage_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage-controller */ "./src/storage-controller.js");
/* harmony import */ var _project_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project-manager */ "./src/project-manager.js");







const mytodo = (0,_factories_todo_factory__WEBPACK_IMPORTED_MODULE_0__["default"])({
  id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])(),
  title: "todo title",
  description: "todo description",
  dueDate: new Date(),
  priority: "1",
});

const mytodo2 = (0,_factories_todo_factory__WEBPACK_IMPORTED_MODULE_0__["default"])({
  id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])(),
  title: "todo title 2",
  description: "todo description 2",
  dueDate: new Date(),
  priority: "2",
});

const defaultProject = (0,_factories_project_factory__WEBPACK_IMPORTED_MODULE_1__["default"])({
  id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])(),
  name: "defaultProject",
  todos: [mytodo],
});

const anotherProject = (0,_factories_project_factory__WEBPACK_IMPORTED_MODULE_1__["default"])({
  id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])(),
  name: "anotherProject",
  todos: [mytodo2],
});

_storage_controller__WEBPACK_IMPORTED_MODULE_2__["default"].storeProjects([defaultProject, anotherProject]);
console.log(JSON.parse(_storage_controller__WEBPACK_IMPORTED_MODULE_2__["default"].getProjects()));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7O0FBRWU7QUFDTTtBQUNSO0FBQ0Q7O0FBRWhELGVBQWUsbUVBQVc7QUFDMUIsTUFBTSxnREFBTTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxnQkFBZ0IsbUVBQVc7QUFDM0IsTUFBTSxnREFBTTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCx1QkFBdUIsc0VBQWM7QUFDckMsTUFBTSxnREFBTTtBQUNaO0FBQ0E7QUFDQSxDQUFDOztBQUVELHVCQUF1QixzRUFBYztBQUNyQyxNQUFNLGdEQUFNO0FBQ1o7QUFDQTtBQUNBLENBQUM7O0FBRUQseUVBQTJCO0FBQzNCLHVCQUF1Qix1RUFBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZmFjdG9yaWVzL3Byb2plY3QtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZmFjdG9yaWVzL3RvZG8tZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbiAgICAvLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHsgcGFyc2VUb2RvcyB9IGZyb20gXCIuL3RvZG8tZmFjdG9yeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9qZWN0RmFjdG9yeSh7IGlkLCBuYW1lLCB0b2RvcyB9KSB7XG4gIGNvbnN0IHRvZG9zQXJyYXkgPSBbLi4udG9kb3NdO1xuXG4gIGZ1bmN0aW9uIGFkZFRvZG8odG9kbykge1xuICAgIHRvZG9zQXJyYXkucHVzaCh0b2RvKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRvZG8odG9kb2lkKSB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gdG9kb3NBcnJheS5maW5kSW5kZXgoKHQpID0+IHtcbiAgICAgIHQuaWQgPT09IHRvZG9pZDtcbiAgICB9KTtcbiAgICBpZiAodG9kb0luZGV4ICE9PSAtMSkge1xuICAgICAgdG9kb3NBcnJheS5zcGxpY2UodG9kb0luZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRvZG9JbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRvZG9XaXRoSWQodG9kb0lkKSB7XG4gICAgcmV0dXJuIHRvZG9zQXJyYXkuZmluZCgodCkgPT4ge1xuICAgICAgcmV0dXJuIHQuaWQgPT09IHRvZG9JZDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5VG9kb0FycmF5KCkge1xuICAgIHRvZG9zQXJyYXkubGVuZ3RoID0gMDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0IGlkKCkge1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH0sXG4gICAgZ2V0IHRvZG9zQXJyYXkoKSB7XG4gICAgICByZXR1cm4gWy4uLnRvZG9zQXJyYXldO1xuICAgIH0sXG4gICAgbmFtZSxcbiAgICBhZGRUb2RvLFxuICAgIHJlbW92ZVRvZG8sXG4gICAgZ2V0VG9kb1dpdGhJZCxcbiAgICBlbXB0eVRvZG9BcnJheSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VQcm9qZWN0cyhwcm9qZWN0c0FycmF5KSB7XG4gIGlmICghcHJvamVjdHNBcnJheSkgcmV0dXJuO1xuICBjb25zdCBwYXJzZWRQcm9qZWN0cyA9IFtdO1xuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHNBcnJheSkge1xuICAgIHBhcnNlZFByb2plY3RzLnB1c2goXG4gICAgICBQcm9qZWN0RmFjdG9yeSh7XG4gICAgICAgIGlkOiBwcm9qZWN0LmlkLFxuICAgICAgICBuYW1lOiBwcm9qZWN0Lm5hbWUsXG4gICAgICAgIHRvZG9zOiBwYXJzZVRvZG9zKHByb2plY3QudG9kb3NBcnJheSksXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZFByb2plY3RzO1xufVxuXG5leHBvcnQgeyBwYXJzZVByb2plY3RzIH07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUb2RvRmFjdG9yeSh7XG4gIGlkLFxuICB0aXRsZSxcbiAgZGVzY3JpcHRpb24sXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBpc0NvbXBsZXRlID0gZmFsc2UsXG4gIG5vdGVzID0gW10sXG4gIHN1YlRvZG9zID0gW10sXG59KSB7XG4gIGZ1bmN0aW9uIGFkZE5vdGUobm90ZSkge1xuICAgIG5vdGVzLnB1c2gobm90ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTdWJUb2RvKHRvZG8pIHtcbiAgICBzdWJUb2Rvcy5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgaWQoKSB7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfSxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBkdWVEYXRlOiBuZXcgRGF0ZShkdWVEYXRlKSxcbiAgICBwcmlvcml0eSxcbiAgICBpc0NvbXBsZXRlLFxuICAgIGdldCBub3RlcygpIHtcbiAgICAgIHJldHVybiBbLi4ubm90ZXNdO1xuICAgIH0sXG4gICAgZ2V0IHN1YlRvZG9zKCkge1xuICAgICAgcmV0dXJuIFsuLi5zdWJUb2Rvc107XG4gICAgfSxcbiAgICBhZGROb3RlLFxuICAgIGFkZFN1YlRvZG8sXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9kb3ModG9kb3NBcnJheSkge1xuICBjb25zdCBwYXJzZWRUb2RvcyA9IFtdO1xuICBmb3IgKGNvbnN0IHRvZG8gb2YgdG9kb3NBcnJheSkge1xuICAgIHBhcnNlZFRvZG9zLnB1c2goVG9kb0ZhY3RvcnkodG9kbykpO1xuICB9XG4gIHJldHVybiBwYXJzZWRUb2Rvcztcbn1cblxuZXhwb3J0IHsgcGFyc2VUb2RvcyB9O1xuIiwiaW1wb3J0IHsgcGFyc2VQcm9qZWN0cyB9IGZyb20gXCIuL2ZhY3Rvcmllcy9wcm9qZWN0LWZhY3RvcnlcIjtcbmltcG9ydCBTdG9yZ2VNYW5hZ2VyIGZyb20gXCIuL3N0b3JhZ2UtY29udHJvbGxlclwiO1xuXG5jb25zdCBQcm9qZWN0c01hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBzdG9yZWRQcm9qZWN0cyA9IHBhcnNlUHJvamVjdHMoSlNPTi5wYXJzZShTdG9yZ2VNYW5hZ2VyLmdldFByb2plY3RzKCkpKTtcbiAgY29uc3QgcHJvamVjdHNBcnJheSA9IHN0b3JlZFByb2plY3RzID8gc3RvcmVkUHJvamVjdHMgOiBbXTtcbiAgY29uc29sZS5sb2cocHJvamVjdHNBcnJheSk7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgcHJvamVjdHNBcnJheS5wdXNoKHByb2plY3QpO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdElkKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gcHJvamVjdHNBcnJheS5maW5kSW5kZXgoKHApID0+IHtcbiAgICAgIHJldHVybiBwLmlkID09PSBwcm9qZWN0SWQ7XG4gICAgfSk7XG4gICAgaWYgKHByb2plY3RJbmRleCAhPT0gLTEpIHtcbiAgICAgIHByb2plY3RzQXJyYXkuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9qZWN0SW5kZXg7XG4gIH07XG5cbiAgY29uc3QgZ2V0UHJvamVjdFdpdGhJZCA9IChwcm9qZWN0SWQpID0+IHtcbiAgICByZXR1cm4gcHJvamVjdHNBcnJheS5maW5kKChwKSA9PiB7XG4gICAgICByZXR1cm4gcC5pZCA9PT0gcHJvamVjdElkO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0IHByb2plY3RzQXJyYXkoKSB7XG4gICAgICByZXR1cm4gWy4uLnByb2plY3RzQXJyYXldO1xuICAgIH0sXG4gICAgYWRkUHJvamVjdCxcbiAgICBkZWxldGVQcm9qZWN0LFxuICAgIGdldFByb2plY3RXaXRoSWQsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0c01hbmFnZXI7XG4iLCJjb25zdCBTdG9yZ2VNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcHJvamVjdHNLZXkgPSBcInByb2plY3RzXCI7XG5cbiAgY29uc3Qgc3RvcmVQcm9qZWN0cyA9IChwcm9qZWN0cykgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3RzS2V5LCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICB9O1xuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9qZWN0c0tleSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzdG9yZVByb2plY3RzLFxuICAgIGdldFByb2plY3RzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3RvcmdlTWFuYWdlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIjtcblxuaW1wb3J0IFRvZG9GYWN0b3J5IGZyb20gXCIuL2ZhY3Rvcmllcy90b2RvLWZhY3RvcnlcIjtcbmltcG9ydCBQcm9qZWN0RmFjdG9yeSBmcm9tIFwiLi9mYWN0b3JpZXMvcHJvamVjdC1mYWN0b3J5XCI7XG5pbXBvcnQgU3RvcmdlTWFuYWdlciBmcm9tIFwiLi9zdG9yYWdlLWNvbnRyb2xsZXJcIjtcbmltcG9ydCBQcm9qZWN0c01hbmFnZXIgZnJvbSBcIi4vcHJvamVjdC1tYW5hZ2VyXCI7XG5cbmNvbnN0IG15dG9kbyA9IFRvZG9GYWN0b3J5KHtcbiAgaWQ6IHV1aWR2NCgpLFxuICB0aXRsZTogXCJ0b2RvIHRpdGxlXCIsXG4gIGRlc2NyaXB0aW9uOiBcInRvZG8gZGVzY3JpcHRpb25cIixcbiAgZHVlRGF0ZTogbmV3IERhdGUoKSxcbiAgcHJpb3JpdHk6IFwiMVwiLFxufSk7XG5cbmNvbnN0IG15dG9kbzIgPSBUb2RvRmFjdG9yeSh7XG4gIGlkOiB1dWlkdjQoKSxcbiAgdGl0bGU6IFwidG9kbyB0aXRsZSAyXCIsXG4gIGRlc2NyaXB0aW9uOiBcInRvZG8gZGVzY3JpcHRpb24gMlwiLFxuICBkdWVEYXRlOiBuZXcgRGF0ZSgpLFxuICBwcmlvcml0eTogXCIyXCIsXG59KTtcblxuY29uc3QgZGVmYXVsdFByb2plY3QgPSBQcm9qZWN0RmFjdG9yeSh7XG4gIGlkOiB1dWlkdjQoKSxcbiAgbmFtZTogXCJkZWZhdWx0UHJvamVjdFwiLFxuICB0b2RvczogW215dG9kb10sXG59KTtcblxuY29uc3QgYW5vdGhlclByb2plY3QgPSBQcm9qZWN0RmFjdG9yeSh7XG4gIGlkOiB1dWlkdjQoKSxcbiAgbmFtZTogXCJhbm90aGVyUHJvamVjdFwiLFxuICB0b2RvczogW215dG9kbzJdLFxufSk7XG5cblN0b3JnZU1hbmFnZXIuc3RvcmVQcm9qZWN0cyhbZGVmYXVsdFByb2plY3QsIGFub3RoZXJQcm9qZWN0XSk7XG5jb25zb2xlLmxvZyhKU09OLnBhcnNlKFN0b3JnZU1hbmFnZXIuZ2V0UHJvamVjdHMoKSkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9