import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/expense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const validateExpenseInput = async (
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
    .withMessage("La cantidad del gasto no puede estar vacia")
    .isNumeric()
    .withMessage("La cantidad del gasto debe ser un numero")
    .custom((value) => {
      if (value < 0) {
        throw new Error("La cantidad del gasto debe ser mayor a 0");
      }
      return true;
    })
    .run(req);

  next();
};

export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("expenseId")
    .isInt()
    .custom((value) => value > 0)
    .withMessage("Id no valido")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    req.expense = expense;

    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to validate budget" });
  }
};
