"use client";
import React, { useContext, useState } from "react";
import { EmpDetailContext } from "@/app/components/context/EmpDetailContext";
import axios from "axios";

const page = () => {
  const { applications, fetchApplications } = useContext(EmpDetailContext);
  const [loading, setLoading] = useState(false);

  const updateApplicationStat = async (id, status) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/applications/updateAppStat/${id}`,
        {
          status,
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        fetchApplications();
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

  return (
    <>
      <div className="flex px-[150px] justify-center  items-center pt-[20px]">
        <div>
          <div className="flex gap-[40px]">
            <h1 className="text-[30px] uppercase font-bold underline">
              All Applications
            </h1>
          </div>
          <div className="flex flex-wrap gap-[20px] mt-[20px]">
            {applications.length <= 0
              ? "No records available"
              : applications.map((application) => (
                  <div
                    className="bg-gray-500 p-6 w-[300px] md:w-[400px] flex flex-col justify-between"
                    key={application._id}
                  >
                    <div>
                      <h1 className="text-gray-400 text-[25px] font-semibold">
                        Candidate Name :-{" "}
                        <span className="text-[#FF9D23]">
                          {application.candidate_name}
                        </span>
                      </h1>
                      <p className="text-gray-400">{application.description}</p>
                      <p className="text-gray-400">
                        Email :-{" "}
                        <span className="text-white">{application.email}</span>
                      </p>
                      <p className="text-gray-400">
                        Resume :-{" "}
                        <span>
                          <a href={application.resume_url}>Link</a>
                        </span>
                      </p>
                      <p className="text-gray-400">
                        Status :-{" "}
                        <span className="text-white">{application.status}</span>
                      </p>
                    </div>
                    <div className="mt-4 flex gap-[10px]  flex-col">
                      <p>Change Status of Job :- </p>
                      <select
                        className="bg-white text-black p-2 rounded"
                        defaultValue={application.status}
                        onChange={(e) =>
                          updateApplicationStat(application._id, e.target.value)
                        }
                        disabled={loading}
                      >
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
