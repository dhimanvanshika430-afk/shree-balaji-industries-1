import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    // Validation
    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide all required fields: name, phone, email, and service.",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Create inquiry record in MongoDB
    const inquiry = await Inquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      message: message ? message.trim() : "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving inquiry to database:", error);

    // If MONGODB_URI is not set
    if (error.message?.includes("MONGODB_URI")) {
      return NextResponse.json(
        {
          success: false,
          error: "Database configuration missing: MONGODB_URI is not set in environment variables.",
        },
        { status: 500 }
      );
    }

    // Handle mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json(
        {
          success: false,
          error: messages.join(", "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error while saving inquiry.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error: any) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch inquiries.",
      },
      { status: 500 }
    );
  }
}
