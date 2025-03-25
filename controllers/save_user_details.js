import { database } from "../database/db.js";

export const save_user_details = async (req, res) => {
    const { name, email } = req.body;
    try {
       console.log("User details coming from frontend: ", name, email)
        // Check if user already exists
        const existingUser = await database.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        // Create new user
        await database.users.create({
            data: { name, email }
        });

        res.status(201).json({
            success: true,
            message: "User details saved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while saving user details",
            error: error.message
        });
    }
};
