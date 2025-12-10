import React from "react";
import { FaMapMarkerAlt, FaStar, FaTools } from "react-icons/fa";

const WorkerCard = ({ worker }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
      {/* Worker Image */}
      {/* <img
        src={worker.photo}
        alt={worker.name}
        className="w-full h-48 object-cover"
      /> */}

      {/* Card Body */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{worker.name}</h2>

        <p className="text-md text-emerald-600 font-semibold flex items-center gap-2">
          <FaTools /> {worker.skill}
        </p>

        <p className="text-gray-600 flex items-center gap-2 mt-2">
          <FaMapMarkerAlt className="text-red-500" /> {worker.location}
        </p>

        <p className="text-gray-700 mt-1">অভিজ্ঞতা: {worker.experience}</p>

        <p className="mt-1">
          স্ট্যাটাস:{" "}
          <span
            className={`font-bold ${
              worker.availability === "সক্রিয়"
                ? "text-green-600"
                : "text-red-600"
            }`}>
            {worker.availability}
          </span>
        </p>

        <div className="flex items-center gap-1 mt-2">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold">{worker.rating}</span>
          <span className="text-gray-500 text-sm">
            ({worker.reviews} রিভিউ)
          </span>
        </div>

        <p className="text-gray-700 text-sm mt-3">{worker.bio}</p>

        <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
          যোগাযোগ করুন
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
