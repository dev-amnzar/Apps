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

export async function GET() {
  const phones = await readPhones();
  return NextResponse.json(phones);
}

export async function POST(request: NextRequest) {
  try {
    const phone: Phone = await request.json();

    if (!phone.brand || !phone.slug || !phone.name) {
      return NextResponse.json({ error: "البيانات الأساسية مطلوبة" }, { status: 400 });
    }

    const phones = await readPhones();

    const exists = phones.find((p) => p.brand === phone.brand && p.slug === phone.slug);
    if (exists) {
      return NextResponse.json({ error: "هذا الهاتف موجود بالفعل" }, { status: 409 });
    }

    phones.push(phone);
    await writePhones(phones);

    return NextResponse.json(phone, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
