import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../models/budget";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("budgetId")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id debe ser mayor a 0")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findByPk(budgetId);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    req.budget = budget;
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to validate budget" });
  }
};

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .run(req);
  await body("amount")
    .notEmpty()
    .withMessage("La cantidad del presupuesto no puede estar vacia")
    .isNumeric()
    .withMessage("La cantidad del presupuesto debe ser un numero")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("La cantidad del presupuesto debe ser mayor a 0");
      }
      return true;
    })
    .run(req);

  next();
};
