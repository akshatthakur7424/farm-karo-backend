import { database } from "../database/db.js";

export const save_asset = async (req, res) => {
    const asset = req.body;
    try {
        await database.assets.create({
            data: {
                name: asset.name,
                url: asset.url,
                userId: asset.email,
            },
        });

        res.status(201).json({
            "success": true,
            "message": "Asset saved successfully"
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}