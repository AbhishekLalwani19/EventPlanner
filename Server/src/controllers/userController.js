import User from "../models/userModel.js"; // ✅ Add this
// import cloudinary from "../utils/cloudinary.js"; // If you're using cloudinary


export const GetProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    res
      .status(200)
      .json({
        message: `Welcome back ${currentUser.fullname}`,
        data: currentUser,
      });
  } catch (error) {
    next(error);
  }
};

// export const UpdateProfile = async (req, res, next) => {
//   try {
//     const currentUser = req.user;
//     if (!currentUser) {
//       const error = new Error("User Not Found !! Login Again");
//       error.statusCode = 401;
//       return next(error);
//     }
// }
//   catch(error) {
//     next(error);
//   }
// };
export const UpdateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get from token middleware

    const { fullname, email, phone } = req.body;
    const file = req.file; // multer gives this

    if (!fullname || !email || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedData = {
      fullname,
      email,
      phone,
    };

    // If image uploaded, process or save the buffer
    if (file) {
      // Example: You can store it directly, or upload to cloudinary
      const photoUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      updatedData.photo = photoUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("UpdateProfile Error:", err);
    next(err);
  }
};
