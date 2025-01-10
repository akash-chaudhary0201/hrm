import axios from "axios";
import React, { useState } from "react";

const AddModalJob = ({ isOpen, onClose, fetchAll }) => {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [posted_date, setPostedDate] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAddEmp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/job/addJob", {
        title,
        description,
        department,
        location,
        posted_date,
        status,
      });
      if (response.data.success) {
        alert("Added Successfully");
        fetchAll();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-[15px] text-center text-white">
            Add Job Details
          </h2>

          <form className="flex flex-col" onSubmit={handleAddEmp}>
            <label className="mb-2 text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
            />
            <label className="mb-2 text-sm font-medium text-gray-300">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department"
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
            />
            <label className="mb-2 text-sm font-medium text-gray-300">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
            />
            <div className="flex justify-between gap-4 mb-4">
              <div className="flex-1">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  Status
                </label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Open, Closed"
                  className="border border-gray-600 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600 w-full"
                />
              </div>
            </div>
            <label className="mb-2 text-sm font-medium text-gray-300">
              Posted Date
            </label>
            <input
              type="date"
              value={posted_date}
              onChange={(e) => setPostedDate(e.target.value)}
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-500 transition duration-200"
            >
              {loading ? "Adding Job..." : "Add Job"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-gray-400 underline hover:text-gray-200"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModalJob;
