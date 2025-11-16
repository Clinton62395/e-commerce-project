import toast from "react-hot-toast";
import { api } from "../services/constant";
import axios from "axios";

// form of upload images and images data to cloudinary and meta data to backend

export const onSubmit = async (data) => {
  try {
    // 1️⃣ Récupérer la signature depuis ton backend
    const signatureRes = await api.get("/auth/signature");
    console.log("Signature =>", signatureRes.data);

    if (!signatureRes.data) return;

    const { signature, timestamp, cloud_key, cloud_name } = signatureRes.data;

    // 2️⃣ Créer le FormData pour l’upload Cloudinary

    const uploadImages = [];

    for (const imagObj of data.images) {
      const formData = new FormData();
      formData.append("file", imagObj.file);
      console.log("imagefile==>", imagObj);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", cloud_key);
      // 3️⃣ Upload vers Cloudinary
      const imageRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      if (!imageRes?.data) return;
      const { url: secure_url, public_id } = imageRes.data;

      uploadImages.push({ url: secure_url, public_id });

      console.log("Cloudinary response links:", uploadImages);
    }

    const payLoad = {
      ...data,
      tags: data.tags.map((tag) => tag.value),
      brands: data.brands.value,
      mainImage: uploadImages[0],
      picture: uploadImages,
    };

    // 4 Poster ton produit ensuite
    const productRes = await api.post("/products/create", payLoad);

    if (productRes.data.data) {
      toast.success(productRes.data.message || "data submitted successful ");
    }
    console.log("Product created:", productRes.data.data);
    return productRes.data.data;
  } catch (err) {
    console.error("❌ Erreur lors de l'upload :", err);

    if (err.response) {
      toast.error(
        err.response.data ||
          err.response.data?.message ||
          "error occured when sending data"
      );
    }
  }
};

export const getProduct = async () => {
  try {
    const res = await api.get("/products/getAll");
    return res.data.data;
  } catch (err) {
    console.log("error when getting products  1==>", err);
  }
};

export const getProductById = async (id) => {
  try {
    if (!id) {
      toast.error("product id not found");
      return;
    }
    const res = await api.get(`products/getOne/${id}`);
    console.log("id du product ==>", res.data.data || res.data);

    return res.data.data || res.data;
  } catch (err) {
    console.log("error when getting products  2==>", err);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/delete/${id}`);
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

export const updateProduct = async ({ _id, data }) => {
  try {
    if (!_id || typeof _id !== "string") {
      toast.error("format id invalid");
      return;
    }

    const toastId = toast.loading("data submitting...");

    // 1 SIGNATURE CLOUDINARY
    const signatureRes = await api.get("/auth/signature");
    if (!signatureRes.data) {
      toast.error("Failed to get cloudinary signature", { id: toastId });
      return;
    }

    const { signature, timestamp, cloud_key, cloud_name } = signatureRes.data;

    let imageUrl = data.mainImageUrl || "";

    // 2 CORRECTION: Gérer FileList correctement
    let file = null;

    if (data.mainImage instanceof FileList) {
      // Si c'est un FileList, prendre le premier fichier
      file = data.mainImage.length > 0 ? data.mainImage[0] : null;
    } else if (Array.isArray(data.mainImage)) {
      // Si c'est un tableau
      file = data.mainImage.length > 0 ? data.mainImage[0] : null;
    } else {
      // Sinon, utiliser directement
      file = data.mainImage;
    }

    console.log("File extracted:", file);
    console.log("File type:", typeof file);
    console.log("Is File instance:", file instanceof File);

    if (file) {
      console.log("File properties:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }

    // 3 UPLOAD CLOUDINARY SI FICHIER NOUVEAU
    if (file && file instanceof File) {
      console.log("Starting upload to Cloudinary...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", cloud_key);

      console.log("FormData prepared, sending to Cloudinary...");

      try {
        const imageRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 30000,
          }
        );

        console.log("Cloudinary response:", imageRes.data);

        if (!imageRes.data?.secure_url) {
          toast.error("Cloudinary upload failed - no secure_url", {
            id: toastId,
          });
          return;
        }

        const { secure_url, public_id } = imageRes.data;
        // imageUrl = imageRes.data.secure_url;
        console.log("Main image URL:", imageUrl);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        console.error("Upload error response:", uploadError.response?.data);
        toast.error("Image upload failed", { id: toastId });
        return;
      }
    } else {
      console.log("No valid file to upload, using existing image");
    }

    // 4 UPDATE BACKEND
    console.log("Sending to backend...", { _id, imageUrl });

    const updateData = {
      ...data,
      url: mainImage.secure_url, // Envoyer l'URL string, pas le File
      public_id: mainImage.public_id, // Envoyer l'URL string, pas le File
    };

    // Nettoyer les données
    delete updateData.mainImageUrl;

    console.log("Final update data:", updateData);

    const res = await api.put(`/products/update/${_id}`, updateData);

    console.log("Backend response:", res.data);

    toast.success("Updated successfully", { id: toastId });
    return res.data.data;
  } catch (err) {
    console.error("Error in updateProduct:", err);
    console.error("Error response:", err.response?.data);
    toast.error(
      "Update failed: " + (err.response?.data?.message || err.message)
    );
  }
};
