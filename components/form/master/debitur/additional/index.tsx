import {
  createDebiturAdditionalAction,
  updateDebiturAdditionalAction,
} from "@/actions/master/debitur";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { debiturAdditionalSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface DebiturAdditionalFormProps {
  onClose: () => void;
  initialData?: DebiturAdditional | null;
  mode: "create" | "update";
}

export default function DebiturAdditionalForm({
  onClose,
  initialData,
  mode,
}: DebiturAdditionalFormProps) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof debiturAdditionalSchema>>({
    resolver: zodResolver(debiturAdditionalSchema),
    defaultValues: {
      data: initialData?.data || "",
      source: initialData?.source || "",
      identifier: initialData?.identifier || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof debiturAdditionalSchema>) => {
    setIsPending(true);
    const res =
      mode === "create"
        ? await createDebiturAdditionalAction(data)
        : await updateDebiturAdditionalAction(initialData?.id as number, data);

    if (res.status) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-5"
      >
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Input placeholder="Enter Data" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input placeholder="Enter Source" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifier</FormLabel>
              <FormControl>
                <Input placeholder="Enter Identifier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-x-2 items-center">
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
