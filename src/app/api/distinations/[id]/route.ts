import { NextResponse } from "next/server";
import axios from "axios";
import { distination } from "@/types";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.get(`${baseURL}/data/distinations.json`);
    const data: distination[] = response.data;

    const id = parseInt(params.id);
    const destination = data.find((item) => item.id === id);

    if (!destination) {
      return NextResponse.json(
        { message: "Destination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
