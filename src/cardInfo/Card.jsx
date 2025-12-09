import React from "react";
import {
  FaClock,
  FaHeadset,
  FaMoneyBillWave,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";

const icons = {
  FaUserCheck: <FaUserCheck className="text-4xl text-emerald-600" />,
  FaClock: <FaClock className="text-4xl text-blue-600" />,
  FaMoneyBillWave: <FaMoneyBillWave className="text-4xl text-yellow-600" />,
  FaHeadset: <FaHeadset className="text-4xl text-red-600" />,
  FaShieldAlt: <FaShieldAlt className="text-4xl text-purple-600" />,
};

const Card = ({ item }) => {
  return (
    <div className={`p-6 rounded-xl shadow-md ${item.bg}`}>
      <div className="mb-4">{icons[item.icon]}</div>
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-3">{item.description}</p>

      <ul className="text-gray-700 space-y-1">
        {item.features.map((feature, idx) => (
          <li key={idx}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
