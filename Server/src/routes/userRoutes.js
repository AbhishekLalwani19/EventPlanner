import express from "express";
import { GetProfile } from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
import { UpdateProfile } from "../controllers/userController.js";
import { UpdateUser } from "../controllers/authController.js";

// const storage = multer.memoryStorage();
// const upload = multer({ storage });


const upload = multer();

const router = express.Router();

router.get("/profile", Protect, GetProfile);


// router.put('/update/:id', UpdateUser);

// router.put("/update/:id", upload.single("photo"), UpdateUser);
router.put("/update/:id", Protect, upload.single("picture"), UpdateUser);


router.put("/update", Protect, upload.single("picture"), UpdateProfile);

export default router;