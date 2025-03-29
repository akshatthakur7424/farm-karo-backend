export const logRequest = (req, res, next) => {
    console.log("Request Body:", req.body); // Logs text fields (e.g., name, khasraNumber, phoneNumber)
    // console.log("Uploaded File:", req.body.file); // Logs file details

    next(); // Pass control to the next middleware or route handler
};
