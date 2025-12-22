import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const SelectRoll = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return;

    //  STEP 1: GET JWT TOKEN FROM localStorage
    const token = localStorage.getItem("access-token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Access token not found. Please login again.",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      // STEP 2: SEND PATCH REQUEST WITH AUTH HEADER
      await axios.patch(
        `https://workers-details-server.vercel.app/users/profile/${currentUser.uid}`,
        { role, profileCompleted: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // STEP 3: UPDATE LOCAL STATE
      setCurrentUser({
        ...currentUser,
        role,
        profileCompleted: true,
      });

      // STEP 4: SHOW SUCCESS ALERT
      Swal.fire({
        icon: "success",
        title: "Role selected",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });

      // STEP 5: REDIRECT BASED ON ROLE
      if (role === "worker" || role === "both") {
        navigate("/dashboard/workerDash");
      } else {
        navigate("/dashboard/client");
      }
    } catch (error) {
      console.error("Role update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.response?.data?.message || "Something went wrong",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 border">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Select Your Role
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="worker"
              checked={role === "worker"}
              onChange={handleRoleChange}
              className="radio"
            />
            Worker
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="client"
              checked={role === "client"}
              onChange={handleRoleChange}
              className="radio"
            />
            Client
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="both"
              checked={role === "both"}
              onChange={handleRoleChange}
              className="radio"
            />
            Both
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Save Role
        </button>
      </form>
    </div>
  );
};

export default SelectRoll;
