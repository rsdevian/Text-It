import User from "../models/user.model.js";

export async function getUsersForSidebar(req,res) {
    try{
        const loggedInUserId = req.user.id;
        const filteredUsers = await User.find({ _id: { $ne : loggedInUserId }}).select("-password")

        res.status(200).json(filteredUsers);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error" + error.message})
    }
}
