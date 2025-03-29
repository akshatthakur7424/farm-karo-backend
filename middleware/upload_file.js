import fs from "fs";
import path from "path";

const uploadBase64File = (req, res, next) => {
    try {
        const { file } = req.body;

        if (!file || !file.startsWith("data:application/pdf;base64,")) {
            return res.status(400).json({ success: false, message: "Invalid file format" });
        }

        // Extract Base64 content (removing prefix)
        const base64Data = file.replace("data:application/pdf;base64,", "");

        // Convert Base64 to Buffer
        const buffer = Buffer.from(base64Data, "base64");

        // Generate a unique filename
        const fileName = `uploaded_${Date.now()}.pdf`;
        const filePath = path.join("uploaded_files", fileName);

        // Ensure the upload directory exists
        if (!fs.existsSync("uploaded_files")) {
            fs.mkdirSync("uploaded_files", { recursive: true });
        }

        // Save the file
        fs.writeFileSync(filePath, buffer);

        // Attach file info to request
        req.savedFilePath = filePath;
        req.savedFileName = fileName;

        console.log("File uploaded successfully:", fileName);
        
        next(); // Pass control to the next middleware/controller
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ success: false, message: "File upload failed", error: error.message });
    }
};

export default uploadBase64File;