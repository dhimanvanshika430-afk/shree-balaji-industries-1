import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
  status: "new" | "contacted" | "in_progress" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema<IInquiry> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },
    service: {
      type: String,
      required: [true, "Service selection is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in_progress", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times in Next.js development mode
const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
