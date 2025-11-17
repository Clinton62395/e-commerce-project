import toast from "react-hot-toast";
import { api } from "../services/constant";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

export const updateProduct = async ({ id, data }) => {
  try {
    if (!id || typeof id !== "string") {
      toast.error("Invalid ID format");
      return;
    }

    const toastId = toast.loading("Updating product...");

    // 1. SIGNATURE CLOUDINARY
    const signatureRes = await api.get("/auth/signature");
    if (!signatureRes.data) {
      toast.error("Failed to get cloudinary signature", { id: toastId });
      return;
    }

    const { signature, timestamp, cloud_key, cloud_name } = signatureRes.data;

    let imageUrl = data.mainImage.url || "";
    let publicId = data.mainImage.public_id || "";

    // 2. CORRECTION: Gérer FileList correctement
    let file = null;

    if (data.mainImage instanceof FileList) {
      file = data.mainImage.length > 0 ? data.mainImage[0] : null;
    } else if (Array.isArray(data.mainImage)) {
      file = data.mainImage.length > 0 ? data.mainImage[0] : null;
    } else {
      file = data.mainImage;
    }

    console.log("File extracted:", file);
    console.log("File type:", typeof file);
    console.log("Is File instance:", file instanceof File);

    // 3. UPLOAD CLOUDINARY SI NOUVEAU FICHIER
    if (file && file instanceof File) {
      console.log("Starting upload to Cloudinary...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", cloud_key);
      // ⚠️ IMPORTANT: Ajouter upload_preset si nécessaire
      // formData.append("upload_preset", "your_upload_preset");

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

        // ✅ CORRECTION: Stocker les valeurs de Cloudinary
        imageUrl = imageRes.data.secure_url;
        publicId = imageRes.data.public_id;

        console.log("New image URL:", imageUrl);
        console.log("New public ID:", publicId);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        console.error("Upload error response:", uploadError.response?.data);
        toast.error("Image upload failed", { id: toastId });
        return;
      }
    } else {
      console.log("No new file to upload, using existing image");
      // ✅ Si pas de nouveau fichier, on garde les anciennes valeurs
      imageUrl;
      publicId;
    }

    // 4. PRÉPARER LES DONNÉES POUR LE BACKEND
    console.log("Sending to backend...", { id, imageUrl, publicId });

    const updateData = {
      ...data,
      mainImage: {
        url: imageUrl,
        public_id: publicId,
      },
    };

    delete updateData.mainImageUrl;
    delete updateData.url;
    delete updateData.public_id;

    console.log("Final update data:", updateData);

    // ✅ CORRECTION: Utiliser le bon paramètre (id au lieu de _id)
    const response = await api.put(`/products/update/${id}`, updateData);

    console.log("Backend response:", response.data);
    if (response.data.data) {
      toast.success("Product updated successfully", { id: toastId });
      return response.data.data;
    }
  } catch (err) {
    console.error("Error in updateProduct:", err);
    console.error("Error response:", err.response?.data);
    toast.error(
      "Update failed: " + (err.response?.data?.message || err.message)
    );
  }
};

export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const res = await api.get(`/products/filters?category=${category}`);
      return res.data?.data || []; 
    },
    staleTime: 1000 * 60 * 5,
  });
};
