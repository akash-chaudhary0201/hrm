"use client";
import React, { useContext, useEffect, useState } from "react";
import { EmpDetailContext } from "@/app/components/context/EmpDetailContext";
import axios from "axios";
import UpdateEmpModal from "../components/updateEmpModal/UpdateEmpModal";
import { MdGroupAdd } from "react-icons/md";
import AddEmpModal from "../components/addEmployeeModal/AddEmpModal";

const page = () => {
  const { employees, fethcEmployees } = useContext(EmpDetailContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [isAddEmpModelOpen, setIsAddEmpModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/employee/deleteEmp/${id}`);
      if (response.data.success) {
        alert(response.data.message);
        await fethcEmployees();
      }
    } catch (error) {}
  };

  const handleUpdate = (id) => {
    setSelectedEmpId(id);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="flex px-[150px] pt-[20px] pb-[20px] justify-center items-center">
        <div>
          <div className="flex gap-[40px]">
            <h1 className="text-[30px] uppercase font-bold underline">
              All Employees
            </h1>
            <button
              onClick={() => setIsAddEmpModalOpen(true)}
              className="text-[40px] text-[#B6CBBD]"
            >
              <MdGroupAdd />
            </button>
          </div>
          <div className="flex flex-wrap gap-[20px] mt-[20px] ">
            {employees.length <= 0
              ? "No records available"
              : employees.map((emp) => (
                  <div
                    className="bg-gray-500 flex justify-between flex-col p-6 w-[300px] md:w-[400px]"
                    key={emp._id}
                  >
                    <div>
                      <h1 className="text-[20px] font-bold">
                        {emp.name}{" "}
                        <span className="text-[#FF9D23]">
                          :- {emp.designation}
                        </span>
                      </h1>
                      <h1 className="text-gray-400">
                        Department :-{" "}
                        <span className="text-white">{emp.department}</span>
                      </h1>
                      <h1 className="text-gray-400">
                        {" "}
                        Email :- <span className="text-white">{emp.email}</span>
                      </h1>
                      <h1 className="text-gray-400">
                        {" "}
                        Phone :-{" "}
                        <span className="text-white">{emp.phoneNumber}</span>
                      </h1>
                    </div>
                    <div className="flex gap-[20px] mt-[10px]">
                      <button
                        onClick={() => handleUpdate(emp._id)}
                        className="bg-blue-600 text-white rounded-lg px-4 py-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="bg-red-600 rounded-lg text-white px-4 py-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        {isModalOpen && (
          <UpdateEmpModal
            isOpen={isModalOpen}
            userId={selectedEmpId}
            fetchAll={fethcEmployees}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {isAddEmpModelOpen && (
          <AddEmpModal
            isOpen={isAddEmpModelOpen}
            fetchAll={fethcEmployees}
            onClose={() => setIsAddEmpModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default page;
