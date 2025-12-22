import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AvailableJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://workers-details-server.vercel.app/jobs"
      );
      setJobs(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "কাজ লোড করা যায়নি", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading jobs...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Available Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">কোনো কাজ পাওয়া যায়নি</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-xl p-5 border">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>

              <p className="text-gray-600 mb-2">{job.description}</p>

              <p className="text-sm text-gray-500 mb-1">বাজেট: {job.budget}</p>

              <p className="text-sm text-gray-500 mb-3">
                লোকেশন: {job.location}
              </p>

              <button className="btn btn-primary btn-sm w-full">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableJob;
