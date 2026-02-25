import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Guide } from "@/types";

const dataPath = path.join(process.cwd(), "data", "guides.json");

async function readGuides(): Promise<Guide[]> {
  const raw = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(raw).guides;
}

async function writeGuides(guides: Guide[]) {
  await fs.writeFile(dataPath, JSON.stringify({ guides }, null, 2), "utf-8");
}

export async function GET() {
  const guides = await readGuides();
  return NextResponse.json(guides);
}

export async function POST(request: NextRequest) {
  try {
    const guide: Guide = await request.json();

    if (!guide.type || !guide.phone || !guide.title) {
      return NextResponse.json({ error: "البيانات الأساسية مطلوبة" }, { status: 400 });
    }

    const guides = await readGuides();

    const exists = guides.find((g) => g.type === guide.type && g.phone === guide.phone);
    if (exists) {
      return NextResponse.json({ error: "هذا الدليل موجود بالفعل" }, { status: 409 });
    }

    guides.push(guide);
    await writeGuides(guides);

    return NextResponse.json(guide, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
