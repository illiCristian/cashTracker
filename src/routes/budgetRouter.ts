import {
  validateBudgetExists,
  validateBudgetInput,
} from "./../middleware/budget";
import { Router } from "express";
import { BudgetController } from "../controller/BudgetController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetId } from "../middleware/budget";

const router = Router();

//Router.param es un middleware que se ejecuta antes que las rutas que contienen el parametro
//En este caso, se ejecuta antes que las rutas que contienen el parametro :id
router.param("budgetId", validateBudgetId);
router.param("budgetId", validateBudgetExists);

router.get("/", BudgetController.getAll);

router.post(
  "/",

  validateBudgetInput,
  handleInputErrors,
  BudgetController.create
);

router.get("/:budgetId", BudgetController.getById);

router.put(
  "/:budgetId",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.updateById
);

router.delete("/:budgetId", BudgetController.deleteById);

export default router;
