import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../config/api";

const UserDashboard = () => {
    const [userdata, setUserData] = useState({
        fullname: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
});

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
          Welcome, {userdata.fullname.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Here's your personal dashboard
        </p>
      </div>

      <div className="w-full max-w-md mt-10 bg-white border border-gray-200 p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105">
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





















































// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import api from "../config/api";

// const UserDashboard = () => {
//   const [userdata, setUserData] = useState({
//     fullName: "John Doe",
//     email: "john.doe@example.com",
//     phone: "123-456-7890",
//   });

// //   const fetchUserData = async () => {
// //     try {
// //       const res = await api.get("/user/profile");
// //       setUserData(res.data.data);
// //       toast.success(res.data.message);
// //     } catch (error) {
// //       toast.error(
// //         `Error : ${error.response?.status || error.message} | ${
// //           error.response?.data.message || ""
// //         }`
// //       );
// //     }
// //   };
// const fetchUserData = async () => {
//   try {
//     const res = await api.get("/user/profile", {
//       headers: {
//         'Cache-Control': 'no-cache', // 🚫 prevent browser caching
//       },
//     });

//     console.log("Response status:", res.status);
//     console.log("Response data:", res.data);

//     setUserData(res.data.data);
//     toast.success(res.data.message);
//   } catch (error) {
//     console.error("FetchUserData error:", error);

//     toast.error(
//       `Error: ${error.response?.status || error.message} | ${
//         error.response?.data?.message || "Something went wrong"
//       }`
//     );
//   }
// };


//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center bg-gray-100">
//         <h1 className="text-2xl font-bold">User Dashboard</h1>
//         <p className="text-gray-600">Welcome to your dashboard!</p>
//       </div>

//       <div className="bg-white mx-auto my-5 w-[25%] border p-6 rounded-lg shadow-md grid justify-around gap-5">
//         <h3>
//           <b>Name :</b> {userdata.fullname}
//         </h3>
//         <h3>
//           <b>Email :</b> {userdata.email}
//         </h3>
//         <h3>
//           <b>Phone :</b> {userdata.phone}
//         </h3>
//       </div>
//     </>
//   );
// };

// export default UserDashboard;