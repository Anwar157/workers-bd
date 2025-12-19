import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password, data.photoURL);

      Swal.fire({
        title: "Registration Successful!",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 3000,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        toast: true,
        position: "top-end",
        timer: 3000,
      });
    }
  };
  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 border">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Full Name is required" })}
            className="w-full input input-bordered mt-1"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Photo URL */}
        <div>
          <label className="font-semibold">Photo URL (optional)</label>
          <input
            type="url"
            {...register("photoURL")}
            className="w-full input input-bordered mt-1"
            placeholder="Enter photo URL"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full input input-bordered mt-1"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full input input-bordered mt-1"
              placeholder="Enter password"
            />
            <span
              className="absolute top-4 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-primary w-full mt-3">Register</button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 font-semibold">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
