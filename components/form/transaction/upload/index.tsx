// To Do
// import {
//   createUploadAction,
//   updateUploadAction,
// } from "@/actions/user-management/upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// To Do
// import { uploadSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";

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
      // onSubmit={form.handleSubmit(onSubmit)}
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
      <div className="grid grid-cols-3 gap-2">
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <Checkbox
            id="agent_call_activity"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:currency-dollar"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-base leading-none font-medium text-center">
              Debitur
            </p>
          </div>
        </Label>
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <Checkbox
            id="rekap_payment"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:phone"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-base leading-none font-medium text-center">
              Agent Call Activity
            </p>
          </div>
        </Label>
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-default has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <Checkbox
            id="debitur"
            className="data-[state=checked]:border-default data-[state=checked]:bg-default data-[state=checked]:text-white dark:data-[state=checked]:border-default dark:data-[state=checked]:bg-default absolute"
          />
          <div className="flex flex-col gap-4 font-normal justify-center p-2 w-full">
            <Icon
              icon={"heroicons-outline:document-text"}
              className="w-10 h-10 m-auto"
            />
            <p className="text-base leading-none font-medium text-center">
              Rekap Payment
            </p>
          </div>
        </Label>
      </div>

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="picture">File</Label>
        <Input id="picture" type="file" />
      </div>

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
