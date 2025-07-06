import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{ type: String, required: false },

}
, {
    timestamps: true,
});
const User = mongoose.model("user", userSchema);
export default User;
