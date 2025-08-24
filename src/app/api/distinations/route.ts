import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.get(`${baseURL}/data/distinations.json`);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
