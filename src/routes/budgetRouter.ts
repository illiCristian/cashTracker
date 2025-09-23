import {
  validateBudgetExists,
  validateBudgetInput,
} from "./../middleware/budget";
import { Router } from "express";
import { BudgetController } from "../controller/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetId } from "../middleware/budget";
import { ExpensesController } from "../controller/ExpenseController";
import {
  validateExpenseExists,
  validateExpenseId,
  validateExpenseInput,
} from "../middleware/expense";

const router = Router();

//Router.param es un middleware que se ejecuta antes que las rutas que contienen el parametro
//En este caso, se ejecuta antes que las rutas que contienen el parametro :id
router.param("budgetId", validateBudgetId);
router.param("budgetId", validateBudgetExists);

router.param("expenseId", validateExpenseId);
router.param("expenseId", validateExpenseExists);

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

/** Routes for expenses */

router.post(
  "/:budgetId/expenses",
  validateExpenseInput,
  handleInputErrors,
  ExpensesController.create
);

router.get("/:budgetId/expenses/:expenseId", ExpensesController.getById);

router.put("/:budgetId/expenses/:expenseId", ExpensesController.updateById);

router.delete("/:budgetId/expenses/:expenseId", ExpensesController.deleteById);

export default router;
