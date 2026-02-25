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

// id format: "type--phone" e.g. "setup--samsung-s24-ultra"
function parseId(id: string): { type: string; phone: string } | null {
  const parts = id.split("--");
  if (parts.length !== 2) return null;
  return { type: parts[0], phone: parts[1] };
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const parsed = parseId(params.id);
  if (!parsed) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });

  const guides = await readGuides();
  const guide = guides.find((g) => g.type === parsed.type && g.phone === parsed.phone);

  if (!guide) return NextResponse.json({ error: "الدليل غير موجود" }, { status: 404 });

  return NextResponse.json(guide);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const parsed = parseId(params.id);
    if (!parsed) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });

    const updated: Guide = await request.json();
    const guides = await readGuides();
    const index = guides.findIndex((g) => g.type === parsed.type && g.phone === parsed.phone);

    if (index === -1) return NextResponse.json({ error: "الدليل غير موجود" }, { status: 404 });

    guides[index] = { ...guides[index], ...updated };
    await writeGuides(guides);

    return NextResponse.json(guides[index]);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const parsed = parseId(params.id);
    if (!parsed) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });

    const guides = await readGuides();
    const filtered = guides.filter((g) => !(g.type === parsed.type && g.phone === parsed.phone));

    if (filtered.length === guides.length) {
      return NextResponse.json({ error: "الدليل غير موجود" }, { status: 404 });
    }

    await writeGuides(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
