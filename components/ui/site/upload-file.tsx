"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FileWithPreview extends File {
  preview: string;
}

const UploadFile = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const img = files.map((file) => (
    <div className="w-full h-full relative">
      <Button
        type="button"
        className="absolute top-0 right-0 h-8 w-8 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20 md:p-0"
        onClick={() => {
          setFiles(files.filter((f) => f.name !== file.name));
        }}
      >
        <span className="text-sm">
          <Icon icon="fa6-solid:xmark" />
        </span>
      </Button>
      <Image
        key={file.name}
        alt={file.name}
        width={300}
        height={300}
        className="w-full aspect-square object-cover rounded-md border border-default-200 dark:border-default-300"
        src={URL.createObjectURL(file)}
      />
    </div>
  ));

  return (
    <div className={files.length ? "h-auto w-full" : ""}>
      {files.length ? (
        <div className="grid grid-cols-4 gap-3">{img}</div>
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <div className="w-full text-center border-dashed border border-default-200 dark:border-default-300 rounded-md py-[52px] flex items-center flex-col">
            <CloudUpload className="text-default-300 w-10 h-10" />
            <h4 className="text-2xl font-medium mb-1 mt-3 text-card-foreground/80">
              Drop files here or click to upload.
            </h4>
            <div className="text-xs text-muted-foreground">
              (find your file in your device to upload it)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
