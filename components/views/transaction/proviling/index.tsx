"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/partials/container/page-container";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkDebiturSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { generateColumns as generateColumnsDetail } from "./column-detail";
import { useAuthorization } from "@/hooks/use-authorization";
import ActionDialog from "@/components/ui/site/action-dialog";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckDebiturView({
  checkDebiturs,
}: {
  checkDebiturs: GeneralAPIFetchResponse<CheckDebitur[]>;
}) {
  const { hasPermission } = useAuthorization();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(
    searchParams ? searchParams.toString() : ""
  );

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<CheckDebitur | null>(null);

  const form = useForm<z.infer<typeof checkDebiturSchema>>({
    resolver: zodResolver(checkDebiturSchema),
  });

  const onSubmit = async (data: z.infer<typeof checkDebiturSchema>) => {
    setIsPending(true);

    params.set("identity_number", data.identity_number);
    router.push(`?${params}`);

    setIsPending(false);
  };

  return (
    <PageContainer title="Profiling Member" search={false}>
      <div>
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 px-10 py-5">
              <div className="col-span-2 flex flex-col gap-2 lg:flex-row lg:items-center">
                <Label htmlFor="identity_number" className="lg:min-w-[160px]">
                  Identity Number
                </Label>
                <FormField
                  control={form.control}
                  name="identity_number"
                  defaultValue={searchParams?.get("identity_number") || ""}
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

      {params.size > 0 && (
        <DataTable
          columns={generateColumns({
            hasPermission,
            onViewClick: (rowData) => {
              setInitialData(rowData);
              setIsOpen(true);
            },
          })}
          data={checkDebiturs.data}
          meta={checkDebiturs.meta}
        />
      )}

      <ActionDialog
        clearFn={() => setInitialData(null)}
        title={"Detail Profilling Number"}
        description={"Detail a Profilling Number in the system"}
        className="md:max-w-2xl"
        form={
          <div className="overflow-x-auto">
            <DataTable
              columns={generateColumnsDetail()}
              data={initialData?.clients || []}
            />
          </div>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </PageContainer>
  );
}
