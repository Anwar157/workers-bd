import React, { useEffect, useState } from "react";
import { serviceCardData } from "./service-card-data/serviceData";
import PricingCard from "./PricingCard";

const Services = () => {
  const [plans, setPlans] = useState([]);

  // Fake fetch (local data)
  useEffect(() => {
    setPlans(serviceCardData);
  }, []);
  return (
    <div className="lg:ml-64 max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">আমাদের সার্ভিস প্ল্যান</h1>
        <p className="text-gray-500">
          আপনার প্রয়োজন অনুযায়ী সঠিক প্ল্যান বেছে নিন
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Services;
