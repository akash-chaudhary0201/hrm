"use client";
import axios from "axios";
import React, { useState } from "react";

const UpdateEmpModal = ({ isOpen, onClose, userId, fetchAll }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateDetails = {
      name,
      department,
      designation,
      email,
      phoneNumber,
    };
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/employee/updateEmp/${userId}`,
        updateDetails
      );
      if (response.data.success) {
        alert("Updated Successfully");
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
          <p className="text-center mb-[10px] text-blue-600">
            It&apos;s not mandatory to update all the details
          </p>
          <form className="flex flex-col" onSubmit={handleUpdate}>
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
            <label className="mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
            />
            <label className="mb-2 text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="border border-gray-600 rounded-md p-2 mb-4 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
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

export default UpdateEmpModal;
