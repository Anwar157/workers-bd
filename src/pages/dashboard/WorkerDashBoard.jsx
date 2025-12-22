import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";

const WorkerDashBoard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!currentUser) {
      Swal.fire({
        icon: "error",
        title: "প্রোফাইল সংরক্ষণ ব্যর্থ",
        text: "ব্যবহারকারীর তথ্য পাওয়া যায়নি। অনুগ্রহ করে লগইন করুন।",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

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

    const payload = {
      category: data.category,
      skills: data.skills.split(",").map((s) => s.trim()),
      experience: Number(data.experience),
      rate: data.rate,
      availability: {
        status: data.status,
        days: data.days,
        hours: data.hours,
      },
    };

    try {
      await axios.patch(
        `http://localhost:3000/users/profile/${currentUser.uid}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Token পাঠাচ্ছি
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "প্রোফাইল সফলভাবে সংরক্ষণ হয়েছে",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate("/"); // অথবা কোনো worker dashboard
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "প্রোফাইল সংরক্ষণ ব্যর্থ হয়েছে",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Skills */}
        <div>
          <label className="label">দক্ষতা</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("skills", { required: true })}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="label">কত বছরের অভিজ্ঞতা</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("experience", { required: true })}
          />
        </div>

        {/* Rate */}
        <div>
          <label className="label">কাজের চার্জ</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("rate", { required: true })}
          />
        </div>

        {/* Availability */}
        <div className="border rounded-lg p-4">
          <label className="label font-semibold">কাজের সময়সূচী</label>

          <select
            className="select select-bordered w-full mb-3"
            {...register("status", { required: true })}>
            <option value="Available">উপলব্ধ</option>
            <option value="Busy">ব্যস্ত</option>
          </select>

          <input
            type="text"
            placeholder="দিন"
            className="input input-bordered w-full mb-2"
            {...register("days")}
          />

          <input
            type="text"
            placeholder="সময়"
            className="input input-bordered w-full"
            {...register("hours")}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
};

export default WorkerDashBoard;
