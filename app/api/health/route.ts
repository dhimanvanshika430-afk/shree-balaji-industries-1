import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          status: "unconfigured",
          database: "disconnected",
          message: "MONGODB_URI is not set in .env.local",
        },
        { status: 503 }
      );
    }

    await connectToDatabase();
    const readyState = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

    const stateMap: Record<number, string> = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    return NextResponse.json({
      status: readyState === 1 ? "healthy" : "degraded",
      database: stateMap[readyState] || "unknown",
      host: mongoose.connection.host,
      databaseName: mongoose.connection.name,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        message: error.message || "Failed to connect to MongoDB",
      },
      { status: 500 }
    );
  }
}
