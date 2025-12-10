import React from "react";
import WorkerCard from "./WorkerCard";
import { workerData } from "./workerData";
const WorkerCards = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center pt-6">
        Workers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {workerData.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </div>
  );
};

export default WorkerCards;
