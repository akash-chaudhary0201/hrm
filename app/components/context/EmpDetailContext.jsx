"use client";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const EmpDetailContext = createContext();

export const EmpDetProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [totalEmp, setTotalEmp] = useState(0);
  const [hrName, setHrname] = useState("");
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [applications, setApplications] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);

  const fethcEmployees = async () => {
    try {
      const response = await axios.get("/api/employee/getAllEmp");
      if (response.data.success) {
        setEmployees(response.data.data);
        setTotalEmp(response.data.count);
      }
    } catch (error) {
      console.log("Error in fetching details", error);
    }
  };
  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/job/getAllJobs");
      if (response.data.success) {
        setJobs(response.data.data);
        setTotalJobs(response.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/api/applications/getAllApplications");
      setApplications(response.data.data);
      setTotalApplications(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchHRDet = async () => {
      try {
        const response = await axios.get("/api/hr/hrDet");
        if (response.data.success) {
          setHrname(response.data.hr.name);
        }
      } catch (error) {}
    };

    fethcEmployees();
    fetchHRDet();
    fetchJobs();
    fetchApplications();
  }, []);

  return (
    <EmpDetailContext.Provider
      value={{
        employees,
        totalEmp,
        hrName,
        fethcEmployees,
        jobs,
        totalJobs,
        fetchJobs,
        applications,
        totalApplications,
        fetchApplications,
      }}
    >
      {children}
    </EmpDetailContext.Provider>
  );
};
