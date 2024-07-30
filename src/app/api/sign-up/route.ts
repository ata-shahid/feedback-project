import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verificationCode = verifyCode;
        existingUserByEmail.verifyExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = await new UserModel({
        username,
        email,
        password: hashedPassword,
        verificationCode: verifyCode,
        verifyExpiry: expiryDate,
        isVerified: false,
        isAccepting: true,
        messages: [],
      });
      await newUser.save();
    }
    //send verification email

    const emailResponse = await sendEmail(email, username, verifyCode);
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: email.Response.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error signing up", error);
    return Response.json(
      {
        success: false,
        message: "Failed to sign up",
      },
      { status: 500 }
    );
  }
}
