import toast from "react-hot-toast";
import { api } from "../services/constant";
export const getProduct = async () => {
  try {
    const res = await api.get("/products/getAll");
    return res.data.data;
  } catch (err) {
    console.log("error when getting products  1==>", err);
  }
};

export const getSingleProduct = async (id) => {
  try {
    const res = await api.get(`products/getOne/${id}`);
    return res.data.data;
  } catch (err) {
    console.log("error when getting products  2==>", err);
  }
};

export const deleteProduct = async (_id) => {
  try {
    const res = await api.delete(`/products/delete/${_id}`);
    if (!res.data.status) {
      throw new Error(
        res.data.message || "error occured when deleting product"
      );
    }

    return res.data.deletedProduct;
  } catch (err) {
    console.log("error when deleting product==>", err);
  }
};

export const updateProduct = async (_id, data) => {
  try {
    const res = await api.get(`/products/update/${_id}`, data);
    if (!res.data.data) {
      throw new Error(res.data.message || "error when updating");
    }
    return res.data.data;
  } catch (err) {
    console.log("error when updating product==>", err);
  }
};
