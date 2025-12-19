import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Profile from "../pages/profile/Profile";
import { useAuth } from "../context/AuthContext";
import SelectRoll from "../pages/dashboard/SelectRoll";
import WorkerDashBoard from "../pages/dashboard/WorkerDashBoard";
import ClientDashBoard from "../pages/dashboard/ClientDashBoard";
import JobPost from "../jobpost/JobPost";

// 🔹 Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!currentUser) return <Navigate to="/login" />;

  return children;
};

// 🔹 Profile Completed & Role Check Wrapper
const ProfileCompleteRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser.profileCompleted)
    return <Navigate to="/dashboard/profile" />;
  if (!currentUser.role) return <Navigate to="/dashboard/select-roll" />;

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "select-role",
        element: <SelectRoll />,
      },
      {
        path: "job-post",
        element: <JobPost />,
      },
      {
        path: "workerDash",
        element: (
          <ProfileCompleteRoute>
            <WorkerDashBoard />
          </ProfileCompleteRoute>
        ),
      },
      {
        path: "client",
        element: (
          <ProfileCompleteRoute>
            <ClientDashBoard />
          </ProfileCompleteRoute>
        ),
      },
    ],
  },
]);
