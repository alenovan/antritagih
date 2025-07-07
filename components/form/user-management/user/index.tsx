import {
  createUserAction,
  updateUserAction,
} from "@/actions/user-management/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Combobox } from "@/components/ui/site/combobox";

interface UserFormProps {
  onClose: () => void;
  initialData?: {
    id?: number;
    name: string;
    email: string;
    status: boolean;
    role_id: number;
    password: string;
  } | null;
  roles: Role[];
  mode: "create" | "update";
}

export default function UserForm({
  onClose,
  initialData,
  roles,
  mode,
}: UserFormProps) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      status: initialData?.status || false,
      role_id: initialData?.role_id,
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setIsPending(true);
    const res =
      mode === "create"
        ? await createUserAction(data)
        : await updateUserAction(initialData?.id as number, data);

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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Combobox
                  data={roles.map((x) => {
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
          name="status"
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-2">
              <FormLabel>Active</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
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
