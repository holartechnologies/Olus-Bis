import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { ALLOWED_FILE_TYPES, ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE } from "./constants";

export interface UploadResult {
  success: boolean;
  fileName?: string;
  filePath?: string;
  error?: string;
}

export async function uploadFile(
  file: File,
  subDirectory: string = "general"
): Promise<UploadResult> {
  try {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!ALLOWED_FILE_EXTENSIONS.includes(ext)) {
        return { success: false, error: "File type not supported" };
      }
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "File size exceeds 20MB limit" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();
    const uniqueName = `${uuid()}.${ext}`;
    const uploadDir = join(process.cwd(), "storage", "private", subDirectory);

    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const relativePath = join("storage", "private", subDirectory, uniqueName);

    return {
      success: true,
      fileName: uniqueName,
      filePath: relativePath,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

export function getFileCategory(fileName: string): string {
  const name = fileName.toLowerCase();
  if (name.includes("passport")) return "passports";
  if (name.includes("certificate") || name.includes("degree") || name.includes("diploma"))
    return "certificates";
  if (name.includes("visa") || name.includes("i-") || name.includes("notice"))
    return "visa-documents";
  if (name.includes("employment") || name.includes("job") || name.includes("offer") || name.includes("resume"))
    return "employment-records";
  return "consultation-files";
}
