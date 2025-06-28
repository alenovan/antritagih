// To Do
// import {
//   createUploadAction,
//   updateUploadAction,
// } from "@/actions/user-management/upload";
import { Button } from "@/components/ui/button";
// To Do
// import { uploadSchema } from "@/lib/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UploadFile from "@/components/ui/site/upload-file";
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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleFileSelected = (newFiles: File[]) => {
    setFiles(newFiles); // Update the state with the selected files
  };

  const handleRadioChange = (value: string) => {
    setBaseFolder(value); // Update base folder selection
  };

  const onSubmit = async (data: any) => {
    if (files.length === 0) {
      toast.error("Please select files to upload.");
      return;
    }

    setIsPending(true);

    const formData = new FormData();
    files.forEach((file: any) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        console.error("Invalid file type:", file);
        toast.error("Invalid file type.");
      }
    });
    formData.append("bucketName", baseFolder);
    formData.append("folderName", "");
    formData.append("clientName", clientName ?? "");

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Files uploaded successfully!");
        console.log("Uploaded file paths:", result.files);
        onClose();
      } else {
        toast.error(result.message || "Error uploading files.");
      }
    } catch (err) {
      console.error("Error uploading files:", err);
      toast.error("Error uploading files.");
    } finally {
      setIsPending(false);
    }
  };

  // To Do
  // const form = useForm<z.infer<typeof uploadSchema>>({
  //   resolver: zodResolver(uploadSchema),
  //   defaultValues: {
  //     name: initialData?.name || "",
  //   },
  // });

  // To Do
  // const onSubmit = async (data: z.infer<typeof uploadSchema>) => {
  //   setIsPending(true);
  //   const res =
  //     mode === "create"
  //       ? await createUploadAction(data)
  //       : await updateUploadAction(initialData?.id as number, data);

  //   if (res.success) {
  //     toast.success(res.message);
  //     onClose();
  //   } else {
  //     toast.error(res.message);
  //   }
  //   setIsPending(false);
  // };

  return (
    // To Do
    // <Form {...form}>
    <form
      autoComplete="off"
      // To Do
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-y-5"
    >
      {/* To Do
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <RadioGroup
        className="grid grid-cols-3 gap-2"
        onValueChange={handleRadioChange}
      >
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <RadioGroupItem
            value="debitur"
            id="debitur"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:user-group"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-sm font-medium text-center">Debitur</p>
          </div>
        </Label>
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <RadioGroupItem
            value="agent-call-activity"
            id="agent-call-activity"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
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
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <RadioGroupItem
            value="rekap-payment"
            id="rekap-payment"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:document-text"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-sm font-medium text-center">Rekap Payment</p>
          </div>
        </Label>
      </RadioGroup>
      {baseFolder === "debitur" && (
        <div className="mb-4">
          <Input
            {...register("clientName", { required: "Client name is required" })}
            placeholder="Enter Client Name"
            value={clientName || ""}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
      )}

      <UploadFile onFileSelected={handleFileSelected} />

      <div className="flex justify-end gap-x-2 items-center">
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </div>
    </form>
    // To Do
    // </Form>
  );
}
