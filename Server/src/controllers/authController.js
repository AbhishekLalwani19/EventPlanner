import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import genToken from '../utils/auth.js';

// export const Register = async (req, res, next) => {

//     try{
//         const {fullname, email, password, phone} = req.body;
//         if(!fullname || !email || !password || !phone){
//             // return res.status(400).json({message: "Please provide all fields"});
//             const error = new Error("Please provide all fields");
//             error.statusCode = 400;
//             return next(error);
//         }

//         const existingUser = User.findOne({email});
//         if(existingUser){
//             // return res.status(409).json({message: "User already exists"});
//             const error = new Error("User already exists");
//             error.statusCode = 409;
//             return next(error);
//         }

//         const hashedPassword = bcrypt.hashSync(password, 10);
//         const user = new User({
//             fullname,
//             email,
//             password: hashedPassword,
//             phone
//         });

//        await user.save()
//             .then((user) => {
//                 res.status(201).json({
//                     message: `User registered successfully ${user.fullname}`, data: user
//                 });
//             })
//             .catch((error) => {
//                 next(error);
//             });
//     }
//     catch(error){
//         next(error);
//     }
// }
export const Register = async (req, res, next) => {
  try {
    const { fullname, email, password, phone } = req.body;

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
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      phone,
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

export const UpdateUser = async (req, res, next) => {
    
}