import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Modal } from "../modal/Logout";

export const UserLogout = ({ onclose }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token missing");
      setIsloading(true);
      setTimeout(() => {
        setIsloading(false);
        navigate("/admin-login");
      }, 1500);
      return;
    }

    setIsloading(true);
    localStorage.removeItem("token");

    setTimeout(() => {
      toast.success("Secured logout");
      setIsloading(false);
      setError("");
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <Modal
        onConfirme={handleLogout}
        onclose={onclose}
        confirmLabel="Confirme"
        cancelLabel="Cancel"
        title="Logout"
        message="Do you want to logout"
        isLoading={isLoading}
      />
    </>
  );
};
