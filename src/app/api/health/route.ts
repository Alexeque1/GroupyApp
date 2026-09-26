import mongoose from "mongoose";
import { connectDB } from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    await mongoose.connection.db?.admin().ping();
    return Response.json({ ok: true, db: "connected" });
  } catch {
    // No devolvemos el error real: podría mostrar datos de la conexión
    return Response.json({ ok: false, db: "error" }, { status: 500 });
  }
}