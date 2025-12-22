import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { HiUserCircle } from "react-icons/hi";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      title: "Logged out!",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top-end",
    });
    navigate("/");
  };

  const navLinks = (
    <>
      <li>
        <Link to="/dashboard">DashBoard</Link>
      </li>
      <li>
        <Link to="/dashboard/show-worker">Workers</Link>
      </li>
      <li>
        <Link to="dashboard/services">Services</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-blue-950 px-4">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-white">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="font-bold text-2xl md:text-3xl text-white">
          Wor<span className="text-emerald-400">kers</span>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-white gap-2">{navLinks}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-3">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle "
              onClick={() => setOpen(!open)}>
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="profile"
                  className="w-10 rounded-full"
                />
              ) : (
                <HiUserCircle className="text-4xl text-white" />
              )}
            </div>

            {open && (
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56">
                <li className="font-bold text-center">
                  {currentUser.displayName}
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-success">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
