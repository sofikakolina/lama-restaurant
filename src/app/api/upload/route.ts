import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file){
        return NextResponse.json({succes: false})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join("public", "files", file.name)
    const imageUrl = `/files/${file.name}`
    await writeFile(path, buffer)
    console.log(`open ${imageUrl} to see the uploaded file`)

    return NextResponse.json({imageUrl})
}