"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/partials/container/page-container";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { provilingSchema } from "@/lib/zod";
import { toast } from "sonner";
import { getCheckDebiturs } from "@/services/master/proviling";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
export default function ProfilingForm({ session }: { session?: Session }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof provilingSchema>>({
    resolver: zodResolver(provilingSchema),
  });
  const onSubmit = async (data: z.infer<typeof provilingSchema>) => {
    setIsPending(true);
    const res = await getCheckDebiturs({
      token: session?.user?.id as string,
      identityNumber: data.identityNumber,
    });
    if (res.status) {
      toast.success(res.message);
      router.push(`proviling-member/${data?.identityNumber ?? ""}`);
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };
  return (
    <PageContainer title="Profiling Member" search={false}>
      <div>
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 px-10 py-5">
              <div className="col-span-2 flex flex-col gap-2 lg:flex-row lg:items-center">
                <Label htmlFor="identityNumber" className="lg:min-w-[160px]">
                  Identity Number
                </Label>
                <FormField
                  control={form.control}
                  name="identityNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Insert Identity Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 lg:pl-[160px] mt-2 flex justify-end">
                <Button disabled={isPending} type="submit">
                  Search
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
