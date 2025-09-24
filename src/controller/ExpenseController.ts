import type { Request, Response } from "express";
import Expense from "../models/expense";

export class ExpensesController {
  static create = async (req: Request, res: Response) => {
    console.log(req.budget.id);
    try {
      const expense = new Expense(req.body);

      expense.budgetId = req.budget.id;

      await expense.save();

      res.status(201).json("Gasto agregado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error " });
    }
  };

  static getById = async (req: Request, res: Response) => {
    res.json(req.expense);
  };

  static updateById = async (req: Request, res: Response) => {
    await req.expense.update(req.body);

    res.json("Gasto actualizado correctamente");
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.expense.destroy();
    res.json("Gasto eliminado correctamente");
  };
}
