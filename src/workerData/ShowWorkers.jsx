import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/workers")
      .then((res) => {
        setWorkers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        👷 উপলব্ধ ওয়ার্কার তালিকা
      </h2>

      {workers.length === 0 ? (
        <p className="text-center text-gray-500">
          এখনো কোনো ওয়ার্কার পাওয়া যায়নি
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div key={worker._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{worker.name || "নাম নেই"}</h3>

                <p>
                  📍 {worker.district || "জেলা নেই"},{" "}
                  {worker.division || "বিভাগ নেই"}
                </p>
                <p>📞 {worker.phone || "ফোন নেই"}</p>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedWorker(worker)}>
                    See More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedWorker && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-xl mb-4">
              👤 {selectedWorker.name || "নাম নেই"}
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>📞 ফোন:</b> {selectedWorker.phone || "নেই"}
              </p>
              <p>
                <b>🎂 জন্ম তারিখ:</b> {selectedWorker.dateOfBirth || "নেই"}
              </p>
              <p>
                <b>📍 বিভাগ:</b> {selectedWorker.division || "নেই"}
              </p>
              <p>
                <b>📍 জেলা:</b> {selectedWorker.district || "নেই"}
              </p>
              <p>
                <b>🏠 থানা:</b> {selectedWorker.thana || "নেই"}
              </p>
              <p>
                <b>🏡 গ্রাম:</b> {selectedWorker.village || "নেই"}
              </p>
              <p>
                <b>📮 পোস্ট কোড:</b> {selectedWorker.postCode || "নেই"}
              </p>

              <p>
                <b>🧑‍🔧 ভূমিকা:</b>{" "}
                <span className="badge badge-success">
                  {selectedWorker.role}
                </span>
              </p>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedWorker(null)}>
                বন্ধ করুন
              </button>
            </div>
          </div>
        </dialog>
      )}
      {/* =============== MODAL END =============== */}
    </div>
  );
};

export default ShowWorkers;
