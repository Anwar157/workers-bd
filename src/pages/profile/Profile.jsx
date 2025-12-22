import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import avatar from "../../assets/avater.jpeg";

const image_host = import.meta.env.VITE_image_host;

const DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const Profile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    division: "",
    district: "",
    thana: "",
    village: "",
    postCode: "",
    photoURL: "",
    photoFile: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access-token"); //  token source

        const res = await axios.get(
          `https://workers-details-server.vercel.app/users/${currentUser.uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const {
          name,
          email,
          phone,
          dateOfBirth,
          division,
          district,
          thana,
          village,
          postCode,
          photoURL,
        } = res.data || {};

        setUserData({
          name: name || "",
          email: email || "",
          phone: phone || "",
          dateOfBirth: dateOfBirth || "",
          division: division || "",
          district: district || "",
          thana: thana || "",
          village: village || "",
          postCode: postCode || "",
          photoURL: photoURL || "",
          photoFile: null,
        });

        setPreviewImage(photoURL || "");
      } catch (err) {
        console.error("Fetch user failed:", err);
        Swal.fire({
          title: "Failed to load profile",
          icon: "error",
          toast: true,
          position: "top-end",
          timer: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser]);

  // Handle input change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload image to ImageBB
  const uploadImageToImageBB = async () => {
    if (!userData.photoFile) return userData.photoURL;

    const formData = new FormData();
    formData.append("image", userData.photoFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${image_host}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");

    return data.data.url;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageURL = await uploadImageToImageBB();

      // Firebase update
      await updateUserProfile(userData.name, imageURL);

      const token = localStorage.getItem("access-token");

      if (!token) {
        throw new Error("No access token found");
      }

      // FIX 4: explicit payload (no email / no photoFile)
      await axios.patch(
        `https://workers-details-server.vercel.app/users/${currentUser.uid}`,
        {
          name: userData.name,
          phone: userData.phone,
          dateOfBirth: userData.dateOfBirth,
          division: userData.division,
          district: userData.district,
          thana: userData.thana,
          village: userData.village,
          postCode: userData.postCode,
          photoURL: imageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Profile Updated!",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 2000,
      });

      // Redirect to role selection page
      navigate("/dashboard/select-role");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Update Failed!",
        icon: "error",
        toast: true,
        position: "top-end",
        timer: 2000,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Photo */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={previewImage || userData.photoURL || avatar}
            onError={(e) => (e.target.src = avatar)}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setPreviewImage(URL.createObjectURL(file));
              setUserData((prev) => ({ ...prev, photoFile: file }));
            }}
            className="file-input file-input-bordered w-full max-w-xs"
          />

          <p className="text-xs text-gray-500">JPG / PNG image required</p>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* PHONE & DOB */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input input-bordered"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* DIVISION (DYNAMIC DROPDOWN) */}
        <select
          name="division"
          value={userData.division}
          onChange={handleChange}
          className="input input-bordered"
          required>
          <option value="">Select Division</option>
          {DIVISIONS.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        {/* District & Thana */}

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="district"
            value={userData.district}
            onChange={handleChange}
            placeholder="District"
            className="input input-bordered"
            required
          />
          <input
            name="thana"
            value={userData.thana}
            onChange={handleChange}
            placeholder="Thana / Upazila"
            className="input input-bordered"
            required
          />
        </div>

        {/* Village & Post Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="village"
            value={userData.village}
            onChange={handleChange}
            placeholder="Village"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="postCode"
            value={userData.postCode}
            onChange={handleChange}
            placeholder="Post Code"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
