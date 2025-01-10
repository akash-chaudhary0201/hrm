"use client";
import React, { useContext, useState } from "react";
import { EmpDetailContext } from "../components/context/EmpDetailContext";
import axios from "axios";
import AddModalJob from "../components/addJobModal/AddModalJob";
import { IoIosAddCircle } from "react-icons/io";

const page = () => {
  const { jobs, fetchJobs } = useContext(EmpDetailContext);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const updateJobStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/job/updateJob/${id}`, {
        status,
      });
      if (response.data.success) {
        alert(response.data.message);
        fetchJobs();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      alert("Failed to update job status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/job/deleteJob/${id}`);
      if (response.data.success) {
        alert("Job Removed from portal");
        fetchJobs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex px-[150px] pt-[20px] justify-center items-center">
        <div>
          <div className="flex gap-[40px]">
            <h1 className="text-[30px] uppercase font-bold underline">
              All Jobs
            </h1>
            <button
              onClick={() => setIsAddJobModalOpen(true)}
              className="text-[40px] text-[#B6CBBD]"
            >
              <IoIosAddCircle />
            </button>
          </div>
          <div className="flex flex-wrap gap-[20px] mt-[20px]">
            {jobs.length <= 0
              ? "No records available"
              : jobs.map((job) => (
                  <div
                    className="bg-gray-500 p-6 w-[300px] md:w-[400px] flex flex-col justify-between"
                    key={job._id}
                  >
                    <div>
                      <h1 className="text-gray-400 text-[25px] font-semibold">
                        Role :-{" "}
                        <span className="text-[#FF9D23]">{job.title}</span>
                      </h1>
                      <p className="text-gray-400">{job.description}</p>
                      <p className="text-gray-400">
                        Department :-{" "}
                        <span className="text-white">{job.department}</span>
                      </p>
                      <p className="text-gray-400">
                        Location :-{" "}
                        <span className="text-white">{job.location}</span>
                      </p>
                      <p className="text-gray-400">
                        Status :-{" "}
                        <span className="text-white">{job.status}</span>
                      </p>
                    </div>
                    <div className="mt-4 flex gap-[10px]  flex-col">
                      <p>Change Status of Job :- </p>
                      <select
                        className="bg-white text-black p-2 rounded"
                        defaultValue={job.status}
                        onChange={(e) =>
                          updateJobStatus(job._id, e.target.value)
                        }
                        disabled={loading}
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Pending">Pending</option>
                      </select>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-600 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        {isAddJobModalOpen && (
          <AddModalJob
            isOpen={isAddJobModalOpen}
            fetchAll={fetchJobs}
            onClose={() => setIsAddJobModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default page;
