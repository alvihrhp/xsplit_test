import { Router } from "express";

/** Controller */
import { TodoController } from "../controllers";

const router = Router();

router.get("/todo-get", TodoController.get);

router.post("/todo-add", TodoController.create);

router.patch("/todo-complete/:id", TodoController.complete);

router.put("/todo-update/:id", TodoController.update);

router.delete("/todo-delete/:id", TodoController.delete);

export default router;
