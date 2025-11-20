import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal } from "../modal/Logout";
import { useAuth } from "../../services/user_context";

export const UserLogout = ({ onclose }) => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);

    
    setTimeout(() => {
      logout(); 
      toast.success("Secured logout");
      setIsLoggingOut(false);
      navigate("/"); 
      if (onclose) onclose();
    }, 1000); 
  };

  return (
    <Modal
      onConfirme={handleLogout}
      onclose={onclose}
      confirmLabel="Confirme"
      cancelLabel="Cancel"
      title="Logout"
      message="Do you want to logout?"
      isLoading={isLoggingOut} 
    />
  );
};
