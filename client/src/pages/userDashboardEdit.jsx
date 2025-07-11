// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import api from "../config/api";
// // import { IoIosSave } from "react-icons/io";
// import { FaCamera } from "react-icons/fa";

// const UserDashboardEdit = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState("");
//   const [preview,setPreview]=useState("");
//   const [userdata, setUserData] = useState("");

//   // Fetch existing data
//   const fetchUserData = async () => {
//     try {
//       const res = await api.get("/user/profile", {
//         headers: {
//           "Cache-Control": "no-cache",
//         },
//       });
//       setFormData(res.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch user data");
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };
//   const handleImageChange = (e)=>{
//     const file = e.target.files[0];

//     const fileURL = URL.createObjectURL(file);
    
//     setPreview(fileURL);
//   }

//   // Submit updated data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.put(`/user/update/${formData._id}`, formData);
//       toast.success(res.data.message);
//       navigate("/userDashboard");
//     } catch (error) {
//       toast.error("Failed to update profile");
//     }

//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-pink-100 via-rose-100 to-red-100 flex flex-col items-center justify-start p-6 font-serif">
//       <h1 className="text-4xl font-extrabold text-rose-700 drop-shadow-md mt-8 mb-4 text-center">
//         Edit Your Wedding Profile 💍
//       </h1>
//       <p className="text-lg text-gray-600 mb-8 text-center">
//         Make sure your love story looks perfect!
//       </p>

//       {/* Profile Image Preview */}
//       <div className="mb-6">
//         <img
//           src={
//             formData.photo ||
//             `https://ui-avatars.com/api/?name=${formData.fullname?.split(" ").join("+")}`
//           }
//           alt="Profile"
//           className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
//         />
//       </div>

//       {/* Edit Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white border border-pink-200 p-8 rounded-3xl shadow-2xl"
//       >
//         <div className="mb-5">
//           <label className="block text-rose-600 font-semibold mb-1">Full Name</label>
//           <input
//             type="text"
//             name="fullname"
//             value={formData.fullname}
//             onChange={handleChange}
//             className="w-full border border-rose-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block text-rose-600 font-semibold mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-rose-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block text-rose-600 font-semibold mb-1">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border border-rose-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
//           />
//         </div>

//        {/* Profile Image Upload Preview */}
// <div className="relative mb-6">
//   <img
//     src={
//       preview ||
//       formData.photo ||
//       `https://ui-avatars.com/api/?name=${formData.fullname?.split(" ").join("+")}`
//     }
//     alt="Preview"
//     className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
//   />
  
//   {/* Camera Icon Overlay */}
//   <label
//     htmlFor="imageUpload"
//     className="absolute bottom-0 right-0 bg-rose-400 hover:bg-pink-600 p-2 rounded-full cursor-pointer text-white shadow-lg"
//     title="Change Photo"
//   >
//     <FaCamera className="text-lg" />
//   </label>
//   <input
//     type="file"
//     id="imageUpload"
//     className="hidden"
//     onChange={handleImageChange}
//   />
// </div>
//         <button
//           type="submit"
//           className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-lg font-semibold transition-all shadow-lg"
//         >
//           Save Changes 💖
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserDashboardEdit;

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../config/api";
import { IoIosSave } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const UserDashboardEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: "",
    fullname: "",
    email: "",
    phone: "",
    photo: ""
  });
  const [preview, setPreview] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/profile");
      setFormData(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setPicture(file);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const updatedForm = new FormData();
  //   updatedForm.append("fullname", formData.fullname);
  //   updatedForm.append("email", formData.email);
  //   updatedForm.append("phone", formData.phone);
  //   if (picture) updatedForm.append("photo", picture);

  //   try {
  //     const res = await api.put(`/user/update`, updatedForm, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     });
  //     toast.success(res.data.message);
  //     navigate("/userDashboard");
  //   } catch (error) {
  //     toast.error(
  //       `Error : ${error.response?.status || error.message} | ${
  //         error.response?.data.message || "Failed to update profile"
  //       }`
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const updatedForm = new FormData();
  updatedForm.append("fullname", formData.fullname);
  updatedForm.append("email", formData.email);
  updatedForm.append("phone", formData.phone);
  
  if (picture) {
    updatedForm.append("picture", picture); // ✅ Must match backend
  }

  try {
    const res = await api.put(`/user/update`, updatedForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(res.data.message);
    navigate("/userDashboard");
  } catch (error) {
    toast.error(
      `Error : ${error.response?.status || error.message} | ${
        error.response?.data.message || "Failed to update profile"
      }`
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-rose-100 to-red-100 flex flex-col items-center justify-start p-6 font-serif">
      <h1 className="text-4xl font-extrabold text-rose-700 drop-shadow-md mt-8 mb-4 text-center">
        Edit Your Wedding Profile 💼
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Make sure your love story looks perfect!
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-pink-200 p-8 rounded-3xl shadow-2xl"
      >
        <div className="relative flex justify-center mb-6">
          <img
            src={
              preview ||
              formData.photo ||
              `https://ui-avatars.com/api/?name=${formData.fullname?.split(" ").join("+")}`
            }
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-20 bg-rose-400 hover:bg-pink-600 p-2 rounded-full cursor-pointer text-white shadow-lg"
            title="Change Photo"
          >
            <FaCamera className="text-lg" />
          </label>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-5">
          <label className="block text-rose-600 font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="mb-5">
          <label className="block text-rose-600 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="mb-5">
          <label className="block text-rose-600 font-semibold mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-lg font-semibold transition-all shadow-lg flex justify-center items-center gap-2"
        >
          <IoIosSave /> {loading ? "Saving..." : "Save Changes 💖"}
        </button>
      </form>
    </div>
  );
};

export default UserDashboardEdit;
