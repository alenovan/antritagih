import {
  createClientParentAction,
  updateClientParentAction,
} from "@/actions/master/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { clientParentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ClientParentFormProps {
  onClose: () => void;
  initialData?: {
    id?: number;
    name: string;
  } | null;
  mode: "create" | "update";
}

export default function ClientParentForm({
  onClose,
  initialData,
  mode,
}: ClientParentFormProps) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof clientParentSchema>>({
    resolver: zodResolver(clientParentSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof clientParentSchema>) => {
    setIsPending(true);
    const res =
      mode === "create"
        ? await createClientParentAction(data)
        : await updateClientParentAction(initialData?.id as number, data);

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
