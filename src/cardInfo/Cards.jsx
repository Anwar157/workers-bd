import React from "react";
import { cardData } from "./cardData/cardData";
import Card from "./Card";

const Cards = () => {
  return (
    <div className="bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center pt-6">
        আপনার প্রয়োজন অনুযায়ী দক্ষ কর্মী
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {cardData.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
