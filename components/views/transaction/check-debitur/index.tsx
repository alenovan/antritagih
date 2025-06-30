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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

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
    <div className="space-y-5">
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
      </PageContainer>

      {params.size > 0 && (
        <Card className=" p-6 pb-10  pt-10 rounded-lg  lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-1">
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-1">
                <div className="text-2xl font-medium text-default-900  mb-[3px]">
                  {checkDebiturs?.data[0]?.name ?? ""}
                </div>
                <div className="text-sm font-light text-default-600 ">
                  {checkDebiturs?.data[0]?.identity_number ?? ""}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-default-900  font-medium mb-1">
                {checkDebiturs?.data[0]?.gender ?? ""}
              </div>
              <div className="text-sm text-default-600 font-light ">Gender</div>
            </div>

            <div className="flex-1">
              <div className="text-base text-default-900  font-medium mb-1">
                {checkDebiturs?.data[0]?.clients?.length ?? ""}
              </div>
              <div className="text-sm text-default-600 font-light ">Credit</div>
            </div>

            <div className="flex-1">
              <div className="text-base text-default-900 font-medium mb-1">
                {checkDebiturs?.data[0]?.province ?? ""}
              </div>
              <div className="text-sm text-default-600 font-light">
                Province
              </div>
            </div>
          </div>
        </Card>
      )}

      {params.size > 0 && (
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Info">
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-normal">Info</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="list space-y-8">
                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:envelope" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        EMAIL
                      </div>
                      <a
                        href="mailto:someone@example.com"
                        className="text-base text-default-600"
                      >
                        {checkDebiturs?.data[0]?.email ?? ""}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:phone" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        PHONE
                      </div>
                      <a
                        href="tel:0189749676767"
                        className="text-base text-default-600"
                      >
                        {checkDebiturs?.data[0]?.mobile_phone ?? ""}
                      </a>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:map" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        Alamat
                      </div>
                      <div className="text-base text-default-600">
                        {checkDebiturs?.data[0]?.address ?? ""}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:heart" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        Status
                      </div>
                      <div className="text-base text-default-600">
                        {checkDebiturs?.data[0]?.mariage_status ?? ""}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:user-group" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        Spouse Name
                      </div>
                      <div className="text-base text-default-600">
                        {checkDebiturs?.data[0]?.spouse_name ?? ""}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:building-office" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        Perusahaan
                      </div>
                      <div className="text-base text-default-600">
                        {checkDebiturs?.data[0]?.company_name ?? ""}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:briefcase" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        Profession
                      </div>
                      <div className="text-base text-default-600">
                        {checkDebiturs?.data[0]?.profession ?? ""}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:user-circle" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        Emergency Contact
                      </div>
                      <div className="text-base text-default-600">
                        {checkDebiturs?.data[0]?.emergency_contact ?? ""}
                      </div>
                    </div>
                  </li>

                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-default-600">
                      <Icon icon="heroicons:phone" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-default-500 mb-1 leading-[12px]">
                        Emergency Number
                      </div>
                      <div className="text-base text-default-600">
                        {checkDebiturs?.data[0]?.emergency_phone1 ?? ""}
                        <br />
                        {checkDebiturs?.data[0]?.emergency_phone2 ?? ""}
                      </div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <Card title="Info">
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-normal">
                  History Credit
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <DataTable
                  columns={generateColumnsDetail()}
                  data={checkDebiturs?.data[0]?.clients || []}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
