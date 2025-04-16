import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    avatar: {
      type: {
        public_id: { type: String, default: null, trim: true },
        url: { type: String, default: null, trim: true },
      },
      required: true,
    },
    email: { type: String, unique: true, required: true, trim: true },
    googleId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, ret) => {
        delete ret.googleId;
        return ret;
      },
    },
  }
);

export const User = mongoose.model("User", userSchema);
