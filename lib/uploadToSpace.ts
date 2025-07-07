import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION ?? "sgp1",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? "",
  },
  endpoint: `https://htss.sgp1.digitaloceanspaces.com`,
  forcePathStyle: true,
});

export async function uploadFilesToS3(
  files: File[],
  bucketName: string,
  clientName?: string,
  month?: string
): Promise<string[]> {
  const currentDate = new Date();
  if (files.length === 0) {
    console.error("No files to upload.");
    throw new Error("No files to upload.");
  }

  const uploadPromises = files.map(async (file: any) => {
    if (!file) {
      throw new Error(`File is missing: ${file.name}`);
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const contentType = file.type;

    const customFolderPath = clientName
      ? `${clientName}/${month}/${fileName}`
      : `${month}/${fileName}`;

    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: customFolderPath,
      Body: fileBuffer,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);

    return s3Client
      .send(command)
      .then(() => {
        console.log(`File uploaded successfully: ${customFolderPath}`);
        return customFolderPath;
      })
      .catch((err) => {
        console.error(`Error uploading file ${fileName}:`, err);
        throw new Error(`Error uploading file ${fileName}: ${err.message}`);
      });
  });

  try {
    const uploadedFiles = await Promise.all(uploadPromises);
    console.log("All files uploaded successfully:", uploadedFiles);
    return uploadedFiles;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
}
