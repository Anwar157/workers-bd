import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 text-center w-full">
      <div className="w-20 h-20 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-3xl">
        👤
      </div>

      <h3 className="text-xl font-bold mt-3">{review.name}</h3>
      <p className="text-sm text-gray-500">{review.location}</p>

      <p className="mt-2 text-yellow-500 text-lg">⭐ {review.rating}</p>

      <p className="text-gray-700 mt-3">{review.review}</p>

      <p className="text-sm text-gray-500 mt-3">
        কর্মী: {review.worker} <br />
        সার্ভিস: {review.serviceType}
      </p>

      <p className="text-xs text-gray-400 mt-2">{review.date}</p>
    </div>
  );
};

export default ReviewCard;
