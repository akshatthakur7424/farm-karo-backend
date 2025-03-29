export const save_file = async (req, res) => {
    const { name, khasraNumber, phoneNumber, email } = req.body;
    const fileName = req.savedFileName;

    console.log("Received request body:", req.body); // Debugging line

    if (!email) {
        return res.status(400).json({ success: false, message: "User email is required." });
    }

    if (!fileName) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    try {
        const newAsset = await database.assets.create({
            data: {
                name,
                khasraNumber,
                phoneNumber,
                url: `/uploaded_files/${fileName}`,
                user: {
                    connect: { email },
                },
            },
        });

        res.status(201).json({
            success: true,
            message: "Asset saved successfully",
            asset: newAsset,
        });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save asset.",
            error: error.message,
        });
    }
};
