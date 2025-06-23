"use client";

import {
  createRolePermissionAction,
  deleteRolePermissionAction,
} from "@/actions/user-management/role";
import { toast } from "sonner";

import PageContainer from "@/components/partials/container/page-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";
import { useState } from "react";

export default function RoleDetailView({
  role,
  permissions,
  id,
}: {
  role: Role;
  permissions: Permission[];
  id: number;
}) {
  const [permissionList, setPermissionList] = useState(
    permissions
      .map((d) => {
        return {
          ...d,
          status:
            (role.permissions || []).filter(({ id }) => d.id === id).length !==
            0,
        };
      })
      .reduce((r, a) => {
        r[a.resource] = r[a.resource] || [];
        r[a.resource].push(a);
        return r;
      }, Object.create(null))
  );

  const handlePermission = async (
    id: number,
    idPermission: number,
    key: string,
    index: number,
    status: boolean
  ) => {
    if (!status) {
      const result = await deleteRolePermissionAction(id, idPermission);
      if (result.message) {
        toast.success(result.message);
      }
      const newPermissionList = permissionList;
      newPermissionList[key][index].status = false;
      setPermissionList(newPermissionList);
    } else {
      const result = await createRolePermissionAction(id, {
        permission_id: idPermission,
      });
      if (result.message) {
        toast.success(result.message);
      }
      const newPermissionList = permissionList;
      newPermissionList[key][index].status = true;
      setPermissionList(newPermissionList);
    }
  };

  return (
    <>
      <PageContainer title={`Role ${role.name}`}>
        <div className="grid grid-cols-3 gap-9">
          {Object.entries(permissionList).map(([key, value]) => (
            <Accordion type="multiple" key={key}>
              <AccordionItem
                value={key}
                aria-label={`Accordion ${key.replaceAll("_", " ")}`}
              >
                <AccordionTrigger className="rounded-md bg-accent flex items-center gap-2 py-2 px-4 [&[data-state=open]]:rounded-b-none">
                  <div className="flex items-center gap-2">
                    <div className="p-1">
                      <User />
                    </div>
                    {key.replaceAll("_", " ")}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 p-4 border border-accent rounded-b-md">
                  {(value as any).map((x: any, index: number) => {
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          defaultChecked={x.status}
                          onCheckedChange={(isSelected: boolean) =>
                            handlePermission(
                              id,
                              Number(x.id),
                              key,
                              index,
                              isSelected
                            )
                          }
                        />
                        {x.permission}
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
