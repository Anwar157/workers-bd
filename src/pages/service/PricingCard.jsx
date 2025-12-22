import React from "react";
import { FaCheckCircle, FaStar, FaTimesCircle } from "react-icons/fa";

const PricingCard = ({ plan }) => {
  return (
    <div
      className={`card bg-base-100 shadow-xl border 
      ${plan.isPopular ? "border-primary scale-105" : "border-base-300"}
      transition-all duration-300`}>
      <div className="card-body">
        {/* Badge */}
        {plan.badge && (
          <div className="badge badge-primary mb-2 self-start">
            <FaStar className="mr-1" /> {plan.badge}
          </div>
        )}

        {/* Plan Name */}
        <h2 className="text-2xl font-bold">{plan.plan}</h2>

        {/* Recommended For */}
        <p className="text-sm text-gray-500">{plan.recommendedFor}</p>

        {/* Price */}
        <div className="my-4">
          <span className="text-4xl font-extrabold">৳{plan.price}</span>
          <span className="text-sm text-gray-500"> / {plan.period}</span>
        </div>

        {/* Limits */}
        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <p> জব পোস্ট: {plan.limits.jobPostPerMonth}</p>
          <p> ক্যান্ডিডেট দেখা: {plan.limits.candidateView}</p>
          <p> সাপোর্ট রেসপন্স: {plan.limits.supportResponseHours} ঘন্টা</p>
        </div>

        {/* Features */}
        <ul className="space-y-2 flex-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              {feature.included ? (
                <FaCheckCircle className="text-success" />
              ) : (
                <FaTimesCircle className="text-error" />
              )}
              <span
                className={
                  feature.included ? "" : "line-through text-gray-400"
                }>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="card-actions mt-6">
          <button
            className={`btn w-full ${
              plan.isPopular ? "btn-primary" : "btn-outline btn-primary"
            }`}>
            {plan.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
