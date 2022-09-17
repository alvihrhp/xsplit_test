"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
/** Controller */
var controllers_1 = require("../controllers");
var router = (0, express_1.Router)();
router.get("/todo-get", controllers_1.TodoController.get);
router.post("/todo-add", controllers_1.TodoController.create);
router.patch("/todo-complete/:id", controllers_1.TodoController.complete);
router.put("/todo-update/:id", controllers_1.TodoController.update);
router.delete("/todo-delete/:id", controllers_1.TodoController.delete);
exports.default = router;
