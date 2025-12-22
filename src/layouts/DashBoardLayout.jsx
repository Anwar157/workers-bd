import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

import {
  HiBriefcase,
  HiHome,
  HiMenu,
  HiSearch,
  HiUser,
  HiX,
} from "react-icons/hi";
import { Link, Outlet } from "react-router";
import { FaTools, FaUsers, FaUserShield } from "react-icons/fa";

const DashBoardLayout = () => {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      title: "Logged out!",
      icon: "success",
      toast: true,
      position: "top-end",
      timer: 2000,
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/*  Sidebar  */}
      <div
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-blue-950 text-white transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-6 border-b border-blue-800">
          <FaUsers className="text-3xl text-emerald-400" />
          <h2 className="text-2xl font-bold">
            Wor<span className="text-emerald-400">kers</span>
          </h2>
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-2 px-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700">
              <HiHome /> Home
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700">
              <HiUser /> My Profile
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/job-post"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700">
              <HiBriefcase /> Post Job
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/available-job"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700">
              <HiBriefcase /> Available Job
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/show-worker"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700">
              <FaUsers /> Workers
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/services"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700">
              <FaTools /> Services
            </Link>
          </li>
        </ul>

        {/* 🔐 Admin Panel (Only Admin Can See) */}
        {currentUser?.role === "admin" && (
          <div className="mt-8 border-t border-blue-800 px-4 pt-4">
            <p className="text-sm text-gray-300 mb-2">Admin Panel</p>

            <Link
              to="/dashboard/admin"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700">
              <FaUserShield /> Admin Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* ================= Overlay (mobile) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-blue-950 text-white px-4 h-16 shadow">
          <div className="flex items-center gap-4">
            <HiMenu
              className="text-2xl cursor-pointer lg:hidden"
              onClick={() => setSidebarOpen(true)}
            />
          </div>

          {/* Search Bar */}
          <div className=" flex items-center bg-white rounded px-3 py-1 text-gray-700">
            <HiSearch />
            <input
              type="text"
              placeholder="Search workers..."
              className="outline-none px-2"
            />
          </div>

          {/* Logout Only */}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
              Logout
            </button>
          )}
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
