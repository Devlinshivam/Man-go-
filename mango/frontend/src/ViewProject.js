import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ViewProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [d ,setD] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://man-go.onrender.com/getproject/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (!responseData) {
          alert(responseData.message);
          navigate("/home");
        } else {
          console.log(responseData.result)
          setD(responseData);
          setData(responseData.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto container mt-8">
        <h2 className="text-2xl font-bold mb-4">Project Details</h2>
        <div className="flex flex-col">
          {/* Project Name */}
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-bold mb-2"
            >
              Project Name:
            </label>
            <div className="border border-gray-300 rounded py-2 px-3 w-full">
              {data.name}
            </div>
          </div>

          {/* Deadline */}
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-bold mb-2">
              Deadline:
            </label>
            <div className="border border-gray-300 rounded py-2 px-3 w-full">
              {d.day} - {d.month} - {d.year}
            </div>
          </div>

          {/* Cost */}
          <div className="mb-4">
            <label htmlFor="cost" className="block text-sm font-bold mb-2">
              Cost:
            </label>
            <div className="border border-gray-300 rounded py-2 px-3 w-full">
              {data.cost}
            </div>
          </div>

          {/* Project Demands */}
          <div className="mb-4">
            <label
              htmlFor="projectDemands"
              className="block text-sm font-bold mb-2"
            >
              Project Demands:
            </label>
            <div className="border border-gray-300 rounded py-2 px-3 w-full">
              {data.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
