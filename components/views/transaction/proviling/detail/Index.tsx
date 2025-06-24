"use client";
import { Icon } from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { generateColumns } from "./column";
import { useAuthorization } from "@/hooks/use-authorization";
import SiteBreadcrumb from "@/components/ui/site/site-breadcrumb";
export default function ProvilingDetail({
  proviling,
}: {
  proviling: Proviling;
}) {
  const { hasPermission } = useAuthorization();
  return (
    <div>
      <SiteBreadcrumb />
      <div className="space-y-5 ">
        <Card className=" p-6 pb-10  pt-10 rounded-lg  lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-1">
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-1">
                <div className="text-2xl font-medium text-default-900  mb-[3px]">
                  {proviling.name ?? ""}
                </div>
                <div className="text-sm font-light text-default-600 ">
                  {proviling.identiy_number ?? ""}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-default-900  font-medium mb-1">
                {proviling.gender ?? ""}
              </div>
              <div className="text-sm text-default-600 font-light ">Gender</div>
            </div>

            <div className="flex-1">
              <div className="text-base text-default-900  font-medium mb-1">
                {proviling.clients?.length ?? ""}
              </div>
              <div className="text-sm text-default-600 font-light ">Credit</div>
            </div>

            <div className="flex-1">
              <div className="text-base text-default-900 font-medium mb-1">
                {proviling.province ?? ""}
              </div>
              <div className="text-sm text-default-600 font-light">
                Province
              </div>
            </div>
          </div>
        </Card>
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
                        {proviling.email ?? ""}
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
                        {proviling.mobile_phone ?? ""}
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
                        {proviling.address ?? ""}
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
                        {proviling.mariage_status ?? ""}
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
                        {proviling.spouse_name ?? ""}
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
                        {proviling.company_name ?? ""}
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
                        {proviling.profession ?? ""}
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
                        {proviling.emergency_contact ?? ""}
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
                        {proviling.emergency_phone1 ?? ""}
                        <br />
                        {proviling.emergency_phone2 ?? ""}
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
                  columns={generateColumns({
                    hasPermission,
                    onViewClick: (rowData) => {},
                  })}
                  data={proviling.clients ?? []}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
