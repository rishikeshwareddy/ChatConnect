import User from "../models/user.model.js";
export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-Password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error in getUserForSidebar contoller: ", error.message);
        res.status(500).json({ error: "Internal server Error" });
    }
}