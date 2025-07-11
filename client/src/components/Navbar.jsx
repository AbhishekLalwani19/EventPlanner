// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="bg-transparent flex justify-center gap-10  text-xl items-center sticky top-0 z-99">
//         <Link to={"/about"}>About</Link>
//         <Link to={"/services"}>Our Services</Link>
//         <Link to={"/stories"}>Client Stories</Link>
//         <Link to={"/"}>
//           <img src={logo} alt="" className="h-[5em]" />
//         </Link>
//         <Link to={"/gallery"}>Gallery</Link>
//         <Link to={"/contact"}>Contact Us</Link>
//         <button
//           className="border p-3 rounded-md"
//           onClick={() => navigate("login")}
//         >
//           {" "}
//           Login to Plan your event{" "}
//         </button>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-pink-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="flex items-center gap-2">
          <FaHeart className="text-pink-600 text-2xl animate-pulse" />
          <span className="text-2xl font-extrabold text-rose-700 font-cursive tracking-wide">
            Wedding Bliss
          </span>
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 text-rose-600 font-semibold text-lg hidden sm:block">
          <Link to="/" className="hover:text-pink-800 transition">Home</Link>
          <Link to="/services" className="hover:text-pink-800 transition">Services</Link>
          <Link to="/vendors" className="hover:text-pink-800 transition">Vendors</Link>
          <Link to="/bookings" className="hover:text-pink-800 transition">Bookings</Link>
          <Link to="/contact" className="hover:text-pink-800 transition">Contact</Link>
        </nav>

        {/* Call to Action */}
        <Link
          to="/login"
          className="bg-rose-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-rose-600 shadow-lg transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
