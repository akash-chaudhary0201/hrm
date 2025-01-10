import axios from "axios";
import { set } from "mongoose";
import React, { useState } from "react";

const AddEmpModal = ({ isOpen, onClose, fetchAll }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hireAt, setHireAt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEmp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/employee/addNewEmp", {
        name,
        designation,
        department,
        email,
        phoneNumber,
        hireAt,
      });
      if (response.data.success) {
        alert("Addedd Successfully");
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
            Update Details
          </h2>

          <form className="flex flex-col" onSubmit={handleAddEmp}>
            <label className="mb-2 text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
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
              Designation
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Designation"
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
            />

            {/* Email and Phone Number side by side */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600 w-full"
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600 w-full"
                />
              </div>
            </div>

            <label className="mb-2 text-sm font-medium text-gray-300">
              Hire Date
            </label>
            <input
              type="date"
              value={hireAt}
              onChange={(e) => setHireAt(e.target.value)}
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-500 transition duration-200"
            >
              {loading ? "Updating Details..." : "Update Details"}
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

export default AddEmpModal;
