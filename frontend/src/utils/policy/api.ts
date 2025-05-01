import axiosWithConfig from "../axiosWithConfig";
import { IPolicy } from ".";

export const getPolicy = async (): Promise<IPolicy[]> => {
  try {
    const response = await axiosWithConfig.get("/policies");
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createPolicy = async (
  data: Omit<IPolicy, "id" | "policy_number">
) => {
  try {
    const response = await axiosWithConfig.post("/policies", data);
    return response.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message);
  }
};

export const updatePolicy = async (id: number, data: Partial<IPolicy>) => {
  try {
    const response = await axiosWithConfig.put(`/policies/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message);
  }
};

export const deletePolicy = async (id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/policies/${id}`);
    return response.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message);
  }
};
