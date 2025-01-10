"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reponse = await axios.post("/api/hr/hrLogin", {
        email: email,
        password: password,
      });

      if (reponse.data.success) {
        router.push("/");
      } else {
        alert(reponse.data.message);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[500px] bg-[#E5D0AC] p-[80px] mt-[50px] rounded-lg">
          <h1 className="text-center mb-[20px] font-semibold text-[30px] text-blue-700">
            HR Login
          </h1>
          <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm  text-gray-900 text-[18px] font-semibold "
              >
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full py-2 px-2 text-black rounded-md focus:outline-none focus:border-transparent"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm  text-gray-900 text-[18px] font-semibold "
              >
                Your password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-2 text-black rounded-md focus:outline-none focus:border-transparent"
                id="password"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? "Please Wait" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
