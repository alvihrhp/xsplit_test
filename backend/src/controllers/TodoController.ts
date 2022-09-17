import { Request, Response, NextFunction } from "express";
/** Prisma */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TodoController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      prisma.$connect();

      const todos = await prisma.todo.findMany({
        orderBy: {
          id: "asc",
        },
      });

      prisma.$disconnect();

      res.status(200).json({
        message: "Fetch Success",
        data: todos,
      });
    } catch (error) {
      prisma.$disconnect();
      console.log(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      prisma.$connect();

      const { name, description, isCompleted } = req.body;

      if (!name || !description) {
        throw { message: "All input must be filled" };
      }

      const newTodo = await prisma.todo.create({
        data: {
          name,
          description,
          isCompleted,
        },
      });

      prisma.$disconnect();

      res.status(201).json({
        message: "Create success",
        data: newTodo,
      });
    } catch (error: any) {
      prisma.$disconnect();
      res.status(400).json({
        message: error.message,
      });
    }
  }
  static async complete(req: Request, res: Response, next: NextFunction) {
    try {
      prisma.$connect();

      const { id } = req.params;

      const completeTodo = await prisma.todo.update({
        where: {
          id: parseInt(id),
        },
        data: {
          isCompleted: true,
        },
      });

      prisma.$disconnect();

      res.status(200).json({
        message: "Task Completed",
        data: completeTodo,
      });
    } catch (error) {
      prisma.$connect();
      console.log(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      prisma.$connect();

      const { name, description, isCompleted } = req.body;

      if (!name || !description) {
        throw { message: "All input must be filled" };
      }

      const { id } = req.params;

      const updateTodo = await prisma.todo.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          description,
          isCompleted,
        },
      });

      prisma.$disconnect();

      res.status(200).json({
        message: "Update Success",
        data: updateTodo,
      });
    } catch (error: any) {
      prisma.$disconnect();
      res.status(400).json({
        message: error.message,
      });
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      prisma.$connect();

      const { id } = req.params;

      const deleteTodo = await prisma.todo.delete({
        where: {
          id: parseInt(id),
        },
      });

      prisma.$disconnect();

      res.status(200).json({
        message: "Delete Succes",
        data: deleteTodo,
      });
    } catch (error) {
      prisma.$disconnect();

      console.log(error);
    }
  }
}

export default TodoController;
