import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserLogin = async (data) => {
    setLoginError("");
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      setLoginError("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleUserLogin)}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center">
              <h1 className="text-2xl lg:text-4xl font-bold">Login now!</h1>
            </div>

            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
              <div className="card-body">
                <fieldset className="space-y-3">
                  {/* Email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Email is required</p>
                  )}

                  {/* Password */}
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      className="input input-bordered w-full pr-10"
                      placeholder="Password"
                    />

                    {/*  React Icon */}
                    <span
                      className="absolute right-3 top-3 cursor-pointer text-gray-500 text-xl"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <HiEyeOff /> : <HiEye />}
                    </span>
                  </div>

                  {errors.password?.type === "required" && (
                    <p className="text-red-500 text-sm">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500 text-sm">
                      Password must be at least 6 characters
                    </p>
                  )}

                  {/* Error Message */}
                  {loginError && (
                    <p className="text-red-500 text-sm">{loginError}</p>
                  )}

                  <div className="text-right">
                    <a className="link link-hover text-sm">Forgot password?</a>
                  </div>

                  <button className="btn btn-neutral w-full mt-2">Login</button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
