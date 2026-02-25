import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Phone } from "@/types";

const dataPath = path.join(process.cwd(), "data", "phones.json");

async function readPhones(): Promise<Phone[]> {
  const raw = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(raw).phones;
}

async function writePhones(phones: Phone[]) {
  await fs.writeFile(dataPath, JSON.stringify({ phones }, null, 2), "utf-8");
}

// id format: "brand-slug" e.g. "samsung-s24-ultra"
function parseId(id: string): { brand: string; slug: string } | null {
  const parts = id.split("-");
  if (parts.length < 2) return null;
  const brand = parts[0];
  const slug = parts.slice(1).join("-");
  return { brand, slug };
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const parsed = parseId(params.id);
  if (!parsed) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });

  const phones = await readPhones();
  const phone = phones.find((p) => p.brand === parsed.brand && p.slug === parsed.slug);

  if (!phone) return NextResponse.json({ error: "الهاتف غير موجود" }, { status: 404 });

  return NextResponse.json(phone);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const parsed = parseId(params.id);
    if (!parsed) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });

    const updated: Phone = await request.json();
    const phones = await readPhones();
    const index = phones.findIndex((p) => p.brand === parsed.brand && p.slug === parsed.slug);

    if (index === -1) return NextResponse.json({ error: "الهاتف غير موجود" }, { status: 404 });

    phones[index] = { ...phones[index], ...updated };
    await writePhones(phones);

    return NextResponse.json(phones[index]);
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const parsed = parseId(params.id);
    if (!parsed) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });

    const phones = await readPhones();
    const filtered = phones.filter((p) => !(p.brand === parsed.brand && p.slug === parsed.slug));

    if (filtered.length === phones.length) {
      return NextResponse.json({ error: "الهاتف غير موجود" }, { status: 404 });
    }

    await writePhones(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
