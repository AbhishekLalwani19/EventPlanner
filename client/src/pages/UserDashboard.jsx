import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../config/api";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState("");
  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/profile", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setUserData(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      console.error("FetchUserData error:", error);
      toast.error(
        `Error: ${error.response?.status || error.message} | ${
          error.response?.data?.message || "Something went wrong"
        }`
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-start p-6">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">
          Welcome, {userdata.fullname} 👋
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Here's your personal dashboard
        </p>
      </div>

      {/* Profile Image */}
      <div className="mt-8">
        {userdata.photo ? (
          <img
            src={userdata.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        ) : (
          <img
            src={`https://ui-avatars.com/api/?name=${userdata.fullname
              ?.split(" ")
              .join("+")}`}
            alt="Default Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        )}
      </div>

      {/* Profile Card */}
      <div className="relative w-full max-w-md mt-6 bg-white border border-gray-200 p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105">
        {/* Edit Button */}
        <button
          onClick={() => navigate("/userDashboardEdit")}
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition"
          title="Edit Profile"
        >
         {" "}
          <CiEdit />Edit
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Your Profile
        </h2>
        <div className="space-y-4 text-gray-700 text-base">
          <div className="flex items-center justify-between">
            <span className="font-medium">👤 Full Name:</span>
            <span>{userdata.fullname}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">📧 Email:</span>
            <span>{userdata.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">📱 Phone:</span>
            <span>{userdata.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
