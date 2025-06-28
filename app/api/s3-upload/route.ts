import { NextResponse } from "next/server";
import { uploadFilesToS3 } from "@/lib/uploadToSpace";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const bucketName = formData.get("bucketName")?.toString() ?? "";
    const clientName = formData.get("clientName")?.toString() ?? "";
    const files = formData.getAll("files");
    if (files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No files were provided.",
      });
    }

    
    const fileObjects: File[] = files.map((file: FormDataEntryValue) => {
      if (file instanceof File) {
        return file;
      } else {
        throw new Error("Invalid file type.");
      }
    });

    // Upload the files to S3
    const uploadedFiles = await uploadFilesToS3(
      fileObjects,
      bucketName,
      clientName
    );

    // Return success response with file info
    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully!",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Error processing files:", error);

    // Return error response
    return NextResponse.json({
      success: false,
      message: "Error uploading files.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
