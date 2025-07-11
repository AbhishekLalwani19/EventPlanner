import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import genToken from '../utils/auth.js';

export const Register = async (req, res, next) => {
  try {
    const { fullname, email, password, phone, } = req.body;

    if (!fullname || !email || !password || !phone) {
      const error = new Error("Please provide all fields");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email }); // ✅ FIXED
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const profilePic = `https://placehold.co/600x400?text=${fullname.charAt(0).toUpperCase()}`;
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      phone,
      photo: profilePic,
    });

    const savedUser = await user.save(); // ✅ CLEANED
    res.status(201).json({
      message: `User registered successfully ${savedUser.fullname}`,
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};


export const Login = async (req, res, next) => {

    try{
        const {email, password} = req.body;
        if(!email || !password){
            // return res.status(400).json({message: "Please provide email and password"});
            const error = new Error("Please provide email and password");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findOne({email});
        if(!user){
            // return res.status(404).json({message: "User not found"});
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        const isverified = await bcrypt.compare(password, user.password);
        if(!isverified){ 
            // return res.status(401).json({message: "Invalid email or password"});
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            return next(error);
        }
        genToken(user._id, res);
        res.status(200).json({
            message: `User logged in successfully ${user.fullname}`, data: user
        });
    }
    catch(error){
        next(error);
    } 



}
export const Logout = (req, res, next) => {

    try{
        res.clearCookie("token");
        res.status(200).json({message: "User logged out successfully"});
    }
    catch(error){
        next(error);
    }   
}

// export const UpdateUser = async (req, res, next) => {
//   try{
//     if(!UserActivation){
//       req.statusCode("404")

//     }
//   }
// }
// export const UpdateUser = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const { fullname, email, phone } = req.body;

//     if (!fullname || !email || !phone) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { fullname, email, phone },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(200).json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
// export const UpdateUser = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     console.log("🟡 Incoming update for ID:", userId);
//     console.log("📦 Payload:", req.body);

//     const { fullname, email, phone } = req.body;

//     if (!fullname || !email || !phone) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { fullname, email, phone },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(200).json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     console.error("❌ UpdateUser Error:", err);
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// };

export const UpdateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // ✅ Use multer to get data from multipart/form-data
    const { fullname, email, phone } = req.body;
    const photo = req.file;

    if (!fullname || !email || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updateFields = { fullname, email, phone };

    // ✅ If a photo is uploaded, upload to Cloudinary or save locally
    if (photo) {
      const base64Image = photo.buffer.toString("base64");
      const imageDataURI = `data:${photo.mimetype};base64,${base64Image}`;

      const uploadResponse = await cloudinary.uploader.upload(imageDataURI, {
        folder: "profilePics",
      });

      updateFields.photo = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
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
    next(err);
  }
};

