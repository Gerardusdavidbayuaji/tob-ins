import axiosWithConfig from "../axiosWithConfig";
import { IPolicy } from ".";

export const getPolicy = async (): Promise<IPolicy[]> => {
  try {
    const response = await axiosWithConfig("/all");
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createPolicy = async (
  data: Omit<IPolicy, "id" | "policy_number">
) => {
  try {
    const response = await axiosWithConfig.post("/create", data);
    return response.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || "Failed to create policy");
  }
};

export const updatePolicy = async (id: number, data: Partial<IPolicy>) => {
  try {
    const response = await axiosWithConfig.put(`/update/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || "Failed to update policy");
  }
};

export const deletePolicy = async (id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || "Failed to delete policy");
  }
};
