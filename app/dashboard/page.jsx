"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { EmpDetailContext } from "@/app/components/context/EmpDetailContext";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/hrLogin");
    } else {
      setLoading(false);
    }
  }, [router]);

  const { totalEmp } = useContext(EmpDetailContext);
  const { totalJobs } = useContext(EmpDetailContext);
  const { totalApplications } = useContext(EmpDetailContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="flex px-[150px] justify-center items-center pt-[20px] pb-[20px]">
        <div>
          <h1 className="text-[30px] uppercase font-bold underline">
            Overview
          </h1>
          <div className="mt-[20px] flex flex-wrap gap-[30px]">
            <div className="bg-gray-700 p-10 w-[250px] rounded-lg">
              <h1 className="text-[20px] text-gray-400">HeadCount</h1>
              <p className="text-[40px] font-bold">{totalEmp}</p>
              <Link href="/allEmp">
                <button className="flex justify-center items-center gap-[10px]">
                  See All <FaArrowRight className="text-[#FF9D23]" />
                </button>
              </Link>
            </div>
            <div className="bg-gray-700 p-10 w-[250px] rounded-lg">
              <h1 className="text-[20px] text-gray-400">Total Job Posted</h1>
              <p className="text-[40px] font-bold">{totalJobs}</p>
              <Link href="/allJobs">
                <button className="flex justify-center items-center gap-[10px]">
                  See All <FaArrowRight className="text-[#FF9D23]" />
                </button>
              </Link>
            </div>
            <div className="bg-gray-700 p-10 w-[250px] rounded-lg">
              <h1 className="text-[20px] text-gray-400">Total Applications</h1>
              <p className="text-[40px] font-bold">{totalApplications}</p>
              <Link href="/allApplications">
                <button className="flex justify-center items-center gap-[10px]">
                  See All <FaArrowRight className="text-[#FF9D23]" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
