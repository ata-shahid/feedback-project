import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface Message extends Document {
  message: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  verificationCode: string;
  verifyExpiry: Date;
  isVerified: boolean;
  isAccepting: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please use a valid Email address",
    ],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verificationCode: {
    type: String,
    required: [true, "Code is required"],
  },
  verifyExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAccepting: {
    type: Boolean,
    default: true,
  },
  messages: [messageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;
