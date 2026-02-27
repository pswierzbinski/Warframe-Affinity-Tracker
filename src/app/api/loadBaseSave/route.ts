import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";


export async function GET() {
  const baseSavePath = path.join(process.cwd(), "src/data/basesave.json");
  const save = JSON.parse(fs.readFileSync(baseSavePath, "utf-8"));

  return NextResponse.json(save);
}
