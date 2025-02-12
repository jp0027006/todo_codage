"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      Cookies.remove("token");
      toast.success("You have successfully logged out!");
      router.push("/login");
    } catch (e) {
      console.error("Logout error:", e);
      toast.error("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
