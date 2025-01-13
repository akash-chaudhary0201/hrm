"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { EmpDetailContext } from "../context/EmpDetailContext";

const Navbar = () => {
  const token = Cookies.get("token");
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      if (response.data.success) {
        router.replace("/");
        alert("Logged Out Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="bg-gray-900 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center flex items-center space-x-3 rtl:space-x-reverse text-2xl font-semibold whitespace-nowrap text-black">
          <Link className="text-white font-bold" href="/">
            HRM
          </Link>
        </span>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2 text-center"
            >
              Logout
            </button>
          ) : (
            <Link href="/hrLogin">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2 text-center"
              >
                Login
              </button>
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 md:p-0 rounded ${
                  isActive("/")
                    ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                    : "text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className={`block py-2 px-3 md:p-0 rounded ${
                  isActive("/dashboard")
                    ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                    : "text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                }`}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
