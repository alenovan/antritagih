import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UploadFile from "@/components/ui/site/upload-file";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { id as ID } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { PopoverContent } from "@/components/ui/popover";
import { uploadAgentCallActivityAction } from "@/actions/transaction/agent-call-activity";
import { uploadSchema, UploadType } from "@/lib/zod";
import MonthPicker from "@/components/ui/monthpicker";

interface UploadFormProps {
  onClose: () => void;
  initialData?: {
    id?: number;
    type: string;
  } | null;
  mode: "create" | "update";
}

export default function UploadForm({
  onClose,
  initialData,
  mode,
}: UploadFormProps) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [baseFolder, setBaseFolder] = useState<string>("agent-call-activity");
  const [clientName, setClientName] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [uploadProgresses, setUploadProgresses] = useState<number[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<boolean[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);

  const [showRadioOptions, setShowRadioOptions] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const handleFileSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setUploadProgresses(new Array(newFiles.length).fill(0));
    setUploadSuccess(new Array(newFiles.length).fill(false));
  };

  const handleRadioChange = (value: string) => {
    setBaseFolder(value);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPending) {
        event.returnValue =
          "You have an ongoing upload. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPending]);

  // Upload a single file and return its filename on success
  const uploadFile = (file: File, index: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("bucketName", baseFolder);
      formData.append("folderName", "");
      formData.append("clientName", clientName ?? "");
      formData.append("clientId", clientId ?? "");
      formData.append("files", file);
      formData.append("month", format(selectedMonth!, "yyyy-MM"));

      const xhr = new XMLHttpRequest();

      xhr.open("POST", "/api/v1/s3-upload", true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgresses((prev) => {
            const newProgress = [...prev];
            newProgress[index] = progress;
            return newProgress;
          });
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          if (result.success) {
            toast.success(`File ${file.name} uploaded successfully!`);

            setUploadSuccess((prev) => {
              const newSuccess = [...prev];
              newSuccess[index] = true;
              return newSuccess;
            });

            setUploadProgresses((prev) => {
              const newProgress = [...prev];
              newProgress[index] = 100;
              return newProgress;
            });

            resolve(file.name);
          } else {
            toast.error(result.message || `Error uploading file ${file.name}.`);
            reject(new Error(result.message || "Upload failed"));
          }
        } else {
          toast.error(`Error uploading file ${file.name}.`);
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => {
        toast.error(`Error uploading file ${file.name}.`);
        reject(new Error("Upload failed"));
      };

      xhr.send(formData);
    });
  };

  const onSubmit = async (data: any) => {
    if (!selectedMonth) {
      toast.error("Please select Month.");
      return;
    }

    if (files.length === 0) {
      toast.error("Please select files to upload.");
      return;
    }

    setIsPending(true);
    setIsSubmitted(true);

    try {
      // Upload all files and get filenames
      const uploadedFilenames = await Promise.all(
        files.map((file, index) => uploadFile(file, index))
      );

      console.log("All uploaded filenames:", uploadedFilenames);
      const payload: UploadType = {
        identifier: baseFolder.replace(/-/g, "_"),
        client_id: clientId ? Number(clientId) : undefined, // clientId is string, convert to number or omit
        month: format(selectedMonth, "yyyy-MM"),
        filename: uploadedFilenames,
      };

      // Validate payload (optional but recommended)
      uploadSchema.parse(payload);

      // Call your uploadAgentCallActivityAction function here
      const result = await uploadAgentCallActivityAction(payload);
      if (!result.status) {
        toast.error(result.message || "Failed to save uploaded data.");
        setIsPending(false);
        return;
      }

      toast.success(
        result.message || "All files uploaded and data saved successfully!"
      );

      // Optional: close form or reset state
      // onClose();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload all files.");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPending) {
        event.returnValue =
          "You have an ongoing upload. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPending]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const option = urlParams.get("option");
    const clientIdFromUrl = urlParams.get("clientid");
    const clientNameFromUrl = urlParams.get("clientname");

    if (option) setBaseFolder(option);
    if (clientIdFromUrl) setClientId(clientIdFromUrl);
    if (clientNameFromUrl) setClientName(clientNameFromUrl);

    if (option) setShowRadioOptions(false);
  }, []);

  const handleBackToForm = () => {
    setIsSubmitted(false);
    setFiles([]);
    setUploadProgresses([]);
    setUploadSuccess([]);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-y-5"
    >
      {!isSubmitted && (
        <>
          {/* Month Picker */}
          <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
          {/* <div className="mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  {selectedMonth
                    ? format(selectedMonth, "MMMM yyyy", { locale: ID })
                    : "Select Month"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedMonth || undefined}
                  onSelect={(date) => setSelectedMonth(date)}
                  modifiersClassNames={{
                    day: "hidden", // try hiding all days
                  }}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div> */}

          {/* Folder Selection Radio */}
          <RadioGroup
            className="grid grid-cols-3 gap-2"
            onValueChange={handleRadioChange}
            defaultValue={baseFolder}
          >
            {showRadioOptions && (
              <>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3">
                  <RadioGroupItem
                    value="debitur"
                    id="debitur"
                    className="absolute"
                  />
                  <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
                    <Icon
                      icon={"heroicons-outline:user-group"}
                      className="w-10 h-10 m-auto"
                    />
                    <p className="text-sm font-medium text-center">Debitur</p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3">
                  <RadioGroupItem
                    value="agent-call-activity"
                    id="agent-call-activity"
                    className="absolute"
                  />
                  <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
                    <Icon
                      icon={"heroicons-outline:phone"}
                      className="w-10 h-10 m-auto"
                    />
                    <p className="text-sm font-medium text-center">
                      Agent Call Activity
                    </p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3">
                  <RadioGroupItem
                    value="rekap-payment"
                    id="rekap-payment"
                    className="absolute"
                  />
                  <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
                    <Icon
                      icon={"heroicons-outline:document-text"}
                      className="w-10 h-10 m-auto"
                    />
                    <p className="text-sm font-medium text-center">
                      Rekap Payment
                    </p>
                  </div>
                </Label>
              </>
            )}
          </RadioGroup>

          {/* Client Name Input for Debitur Folder */}
          {baseFolder === "debitur" && (
            <div className="mb-4">
              <Input
                {...register("clientName", {
                  required: "Client name is required",
                })}
                placeholder="Enter Client Name"
                value={clientName || ""}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
          )}

          {/* File Upload Component */}
          <UploadFile onFileSelected={handleFileSelected} />

          <div className="flex justify-end gap-x-2 items-center mt-4">
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </div>
        </>
      )}

      {isSubmitted && (
        <div className="mt-6 space-y-4">
          {files.map((file, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">{file.name}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">
                    {uploadSuccess[index]
                      ? "100%"
                      : `${
                          uploadProgresses[index] === 100 &&
                          !uploadSuccess[index]
                            ? 99
                            : Math.round(uploadProgresses[index])
                        }%`}
                  </p>

                  {uploadSuccess[index] && (
                    <Icon
                      icon="heroicons-outline:check-circle"
                      className="w-6 h-6 text-green-500"
                    />
                  )}
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full ${
                    uploadProgresses[index] === 100 && uploadSuccess[index]
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } rounded-full`}
                  style={{
                    width: `${
                      uploadProgresses[index] === 100 && !uploadSuccess[index]
                        ? 99
                        : uploadProgresses[index]
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}

          {/* Back to Upload Form button */}
          <div className="flex justify-center mt-6">
            <Button onClick={handleBackToForm}>Back to Upload Form</Button>
          </div>
        </div>
      )}
    </form>
  );
}
