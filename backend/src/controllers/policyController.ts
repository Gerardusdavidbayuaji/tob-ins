import { Request, Response } from "express";
import {
  createPolicyQuery,
  getAllPolicyQuery,
  updatePolicyQuery,
  deletePolicyQuery,
} from "../config/query";

export const createPolicy = async (req: Request, res: Response) => {
  try {
    const result = await createPolicyQuery(req.body);
    res.status(200).json({
      status: "Successful",
      message: "Successfully created policy data",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      message: error.message || "Sorry, please try again",
    });
  }
};

export const getAllPolicy = async (_: Request, res: Response) => {
  try {
    const result = await getAllPolicyQuery();
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

export const updatePolicy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await updatePolicyQuery(id, req.body);
    res.status(200).json({
      status: "Successful",
      message: "Successfully updated policy data",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const deletePolicy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deletePolicyQuery(id);
    res.status(200).json({
      status: "Successful",
      message: `Policy with ID ${id} deleted`,
    });
  } catch (error: any) {
    console.error("Delete Policy Error:", error);
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};
