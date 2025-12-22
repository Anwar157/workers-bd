import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const JobPost = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const jobData = {
      title: data.title,
      category: data.category,
      description: data.description,
      budget: Number(data.budget),
      location: data.location,
      deadline: data.deadline,
      clientId: currentUser.uid,
      clientEmail: currentUser.email,
      createdAt: new Date(),
    };

    try {
      await axios.post(
        "https://workers-details-server.vercel.app/jobs",
        jobData
      );

      Swal.fire({
        icon: "success",
        title: "কাজ সফলভাবে পোস্ট হয়েছে ",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "কাজ পোস্ট করা যায়নি ",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        নতুন কাজ পোস্ট করুন
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="label">কাজের শিরোনাম</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">শিরোনাম আবশ্যক</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label">ক্যাটাগরি</label>
          <select
            className="select select-bordered w-full"
            {...register("category", { required: true })}>
            <option value="">ক্যাটাগরি নির্বাচন করুন</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="label">কাজের বিবরণ</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            {...register("description", { required: true })}></textarea>
        </div>

        {/* Budget */}
        <div>
          <label className="label">বাজেট (৳)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("budget", { required: true })}
          />
        </div>

        {/* Location */}
        <div>
          <label className="label">লোকেশন</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("location", { required: true })}
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="label">ডেডলাইন</label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("deadline", { required: true })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          কাজ পোস্ট করুন
        </button>
      </form>
    </div>
  );
};

export default JobPost;
