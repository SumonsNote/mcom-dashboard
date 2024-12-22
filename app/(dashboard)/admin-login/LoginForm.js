"use client";

import { login } from "@/app/actions";
import { LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DashboardLoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    formData.append("username", formData.get("username"));
    formData.append("password", formData.get("password"));

    try {
      await login(formData);
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Invalid username or password");
    }
  };

  return (
    <>
      {error && <div className="text-xl text-red-500 text-center">{error}</div>}
      <form
        className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            defaultValue={"sumon1"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue={"1111"}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
        >
          <LockIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 mr-2"
            aria-hidden="true"
          />
          {loading ? "signing in" : "Sign in"}
        </button>
      </form>
    </>
  );
};

export default DashboardLoginForm;
