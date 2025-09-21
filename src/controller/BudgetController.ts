import type { Request, Response } from "express";
import Budget from "../models/budget";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        //TODO: Filtrar por el usuario autenticado
      });

      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch budgets" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budgetData = new Budget(req.body);

      await budgetData.save();

      res.status(201).json("Presupuesto creado exitosamente");
    } catch (error) {
      res.status(500).json({ error: "Failed to create budget" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    res.json(req.budget);
  };

  static updateById = async (req: Request, res: Response) => {
    await req.budget.update(req.body);

    res.json("Presupuesto actualizado exitosamente");
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.json("Presupuesto eliminado exitosamente");
  };
}
