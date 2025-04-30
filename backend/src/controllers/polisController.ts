import { Request, Response } from "express";
import {
  createPolisQuery,
  getAllPolisQuery,
  updatePolisQuery,
  deletePolisQuery,
} from "../config/query";

export const createPolis = async (req: Request, res: Response) => {
  try {
    const result = await createPolisQuery(req.body);
    res.status(200).json({
      status: "Successful",
      message: "Successfully created polis data",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      message: error.message || "Sorry, please try again",
    });
  }
};

export const getAllPolis = async (_: Request, res: Response) => {
  try {
    const result = await getAllPolisQuery();
    res.status(200).json({
      status: "Successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const updatePolis = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await updatePolisQuery(id, req.body);
    res.status(200).json({
      status: "Successful",
      message: "Successfully updated polis data",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const deletePolis = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deletePolisQuery(id);
    res.status(200).json({
      status: "Successful",
      message: `Polis with ID ${id} deleted`,
    });
  } catch (error: any) {
    console.error("Delete Polis Error:", error);
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};
