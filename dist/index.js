module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 137:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const core = __webpack_require__(402);
const github = __webpack_require__(979);
const csv = __webpack_require__(155);
const fs = __webpack_require__(747);

try {
  const payload = github.context.payload;

  const input = core.getInput('results');

  const commitId = payload.commits[0].id;
  const date = payload.commits[0].timestamp;
  const repoFullName = payload.repository.full_name;

  csv()
    .fromFile(input)
    .then((parseResult) => {
      let output = {};

      output.idCommit = commitId;
      output.date = date;
      output.id = repoFullName.split('/').join('-');
      output.files = parseResult;

      fs.writeFile('archinaut.json', JSON.stringify(output), 'utf8');
    });
} catch (error) {
  core.setFailed(error.message);
}


/***/ }),

/***/ 402:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 155:
/***/ ((module) => {

module.exports = eval("require")("csvtojson");


/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(137);
/******/ })()
;