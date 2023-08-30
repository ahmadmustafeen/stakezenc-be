const admin = require("../../../firebase");

const bucket = admin.storage().bucket();

// Specify the path and name of the file in Cloud Storage
const storagePath = "images/image.jpg"; // Replace with your desired path and file name

// Upload options
const options = {
  destination: storagePath,
};

const uploadFunction = (image) => {
  const fileBuffer = image.buffer; // Access the file buffer from image

  const file = bucket.file(options.destination);
  return bucket
    .file(options.destination)
    .save(fileBuffer, {
      resumable: false, // Disable resumable uploads for small files
      contentType: image.mimetype, // Set the content type based on the uploaded file's mimetype
    })
    .then(() => {
      return file
        .getSignedUrl({
          action: "read",
          expires: "01-01-2030", // Set an expiration date for the URL if needed
        })
        .then((signedUrls) => {
          const fileUrl = signedUrls[0];
          console.log("File URL:", fileUrl);

          // Send the file URL in the response
          return fileUrl;
        })
        .catch((error) => {});
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      res.status(500).send("Error uploading image");
    });
};

module.exports = uploadFunction;
