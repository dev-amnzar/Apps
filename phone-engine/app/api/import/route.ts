import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Phone } from "@/types";
import {
  fetchBrands,
  fetchPhonesByBrand,
  fetchPhoneSpecs,
  convertToPhone,
} from "@/lib/auto/phone-fetcher";
import { generatePhoneNameAr } from "@/lib/auto/content-generator";

const phonesPath = path.join(process.cwd(), "data", "phones.json");

async function readPhones(): Promise<Phone[]> {
  const raw = await fs.readFile(phonesPath, "utf-8");
  return JSON.parse(raw).phones;
}

async function writePhones(phones: Phone[]) {
  await fs.writeFile(phonesPath, JSON.stringify({ phones }, null, 2), "utf-8");
}

// GET /api/import?action=brands
// GET /api/import?action=phones&brand=samsung
// GET /api/import?action=specs&slug=samsung-galaxy-s24-ultra
export async function GET(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action");

  try {
    if (action === "brands") {
      const brands = await fetchBrands();
      return NextResponse.json({ brands });
    }

    if (action === "phones") {
      const brand = request.nextUrl.searchParams.get("brand");
      const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
      if (!brand) return NextResponse.json({ error: "brand required" }, { status: 400 });

      const result = await fetchPhonesByBrand(brand, page);
      return NextResponse.json(result);
    }

    if (action === "specs") {
      const slug = request.nextUrl.searchParams.get("slug");
      if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

      const specs = await fetchPhoneSpecs(slug);
      if (!specs) return NextResponse.json({ error: "Phone not found" }, { status: 404 });

      const phone = convertToPhone(specs);
      phone.nameAr = generatePhoneNameAr(phone.name, phone.brand);

      return NextResponse.json({ phone });
    }

    return NextResponse.json({ error: "action required (brands, phones, specs)" }, { status: 400 });
  } catch (error) {
    console.error("Import API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST /api/import - Import a phone into the database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone: incoming, overwrite = false } = body as { phone: Phone; overwrite?: boolean };

    if (!incoming || !incoming.brand || !incoming.slug || !incoming.name) {
      return NextResponse.json({ error: "Invalid phone data" }, { status: 400 });
    }

    const phones = await readPhones();
    const existingIdx = phones.findIndex(
      (p) => p.brand === incoming.brand && p.slug === incoming.slug
    );

    if (existingIdx !== -1) {
      if (!overwrite) {
        return NextResponse.json(
          { error: "Phone already exists. Set overwrite=true to replace." },
          { status: 409 }
        );
      }
      phones[existingIdx] = { ...phones[existingIdx], ...incoming };
    } else {
      phones.push(incoming);
    }

    await writePhones(phones);
    return NextResponse.json({
      success: true,
      action: existingIdx !== -1 ? "updated" : "added",
      phone: incoming,
    });
  } catch (error) {
    console.error("Import POST error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
