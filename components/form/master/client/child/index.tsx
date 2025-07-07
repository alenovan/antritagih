import {
  createClientAction,
  updateClientAction,
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
import { clientSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/site/combobox";

interface ClientFormProps {
  onClose: () => void;
  initialData?: {
    id?: number;
    name: string;
    parent_client_id: number;
  } | null;
  mode: "create" | "update";
  parents: ClientParent[];
}

export default function ClientForm({
  onClose,
  initialData,
  mode,
  parents,
}: ClientFormProps) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      parent_client_id: initialData?.parent_client_id || 0,
      name: initialData?.name || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    setIsPending(true);
    const res =
      mode === "create"
        ? await createClientAction(data)
        : await updateClientAction(initialData?.id as number, data);

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
          name="parent_client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Client</FormLabel>
              <FormControl>
                <Combobox
                  data={parents.map((x) => {
                    return { label: x.name, value: x.id };
                  })}
                  field={field}
                  form={form}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
