import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const SendError = (res, status, message, error = null) => {
  if (error) {
    console.log(error);
    return res.status(status).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
  return res.status(status).json({ success: false, message });
};

const SendSuccess = (res, status, message, data) => {
  return res.status(status).json({ success: true, message, ...data });
};

const UploadImage = async (image, folder) => {
  const cloud = await cloudinary.uploader.upload(image, {
    folder: `Expenses/${folder}`,
  });
  return cloud;
};

const DeleteImage = async (publicId, folder) => {
  const cloud = await cloudinary.uploader.destroy(publicId, {
    folder: `Expenses/${folder}`,
  });
  return cloud;
};

export default { SendError, SendSuccess, UploadImage, DeleteImage };
