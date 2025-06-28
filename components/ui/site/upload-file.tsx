import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UploadFileProps {
  onFileSelected: (files: File[]) => void;
}

const UploadFile = ({ onFileSelected }: UploadFileProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      onFileSelected([...files, ...acceptedFiles]);
    },
  });

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = files.filter(
      (file) => file.name !== fileToRemove.name
    );
    setFiles(updatedFiles);
    onFileSelected(updatedFiles);
  };

  const renderFilePreview = (file: File) => {
    const preview = URL.createObjectURL(file);
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-sm">
        {file.type.startsWith("image") ? (
          <Image
            alt={file.name}
            src={preview}
            width={100}
            height={100}
            className="object-cover rounded-md border border-default-200"
          />
        ) : (
          <Icon icon="mdi:file" className="w-8 h-8 text-default-300" />
        )}
        <p>{file.name}</p>
      </div>
    );
  };

  return (
    <div className="w-full">
      {files.length ? (
        <div className="grid grid-cols-4 gap-3 mb-4">
          {files.map((file) => (
            <div className="w-full h-full relative" key={file.name}>
              <Button
                type="button"
                className="absolute top-0 right-0 h-8 w-8 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20 md:p-0"
                onClick={() => handleRemoveFile(file)}
              >
                <span className="text-sm">
                  <Icon icon="fa6-solid:xmark" />
                </span>
              </Button>
              {renderFilePreview(file)}
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4" />
      )}

      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="w-full text-center border-dashed border border-default-200 dark:border-default-300 rounded-md py-[52px] flex items-center flex-col">
          <CloudUpload className="text-default-300 w-10 h-10" />
          <h4 className="text-2xl font-medium mb-1 mt-3 text-card-foreground/80">
            Drop files here or click to upload.
          </h4>
          <div className="text-xs text-muted-foreground">
            (Find your file on your device to upload it)
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
