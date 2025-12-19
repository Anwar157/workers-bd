import React, { useState } from "react";

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
  return (
    <div>
      <p>this is show worker page</p>
    </div>
  );
};

export default ShowWorkers;
