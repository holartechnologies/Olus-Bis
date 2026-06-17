import { generateReactHelpers } from "@uploadthing/react";
import type { OurUploadRouter } from "@/lib/uploadthing";

export const { useUploadThing } = generateReactHelpers<OurUploadRouter>();
