import React from "react";
import Banner from "../banner/Banner";
import Cards from "../../cardInfo/Cards";
import WorkerCards from "../../workerData/WorkerCards";
import ReviewCards from "../review/ReviewCards";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Cards></Cards>
      <WorkerCards></WorkerCards>
      <ReviewCards></ReviewCards>
    </div>
  );
};

export default Home;
