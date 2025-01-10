"use client";
import Link from "next/link";
import React from "react";

const HomeMain = () => {
  return (
    <>
      <div className="flex justify-center items-center text-center">
        <div>
          <h1 className="text-[50px] font-bold pt-[80px] text-[#155E95]">
            Empower Your HR Management With Real-Time Insights
          </h1>
          <p className="text-[20px] mt-[20px] text-white">
            Streamline Employee Tracking, Optimize Performance Metrics, <br />{" "}
            and make Data-Driven Desicions with this comprehensive HR Dashboard.
          </p>
          <Link href="/dashboard">
            <button className="mt-[20px] bg-[#F4FFC3] px-6 py-3 rounded-lg text-black font-semibold">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
