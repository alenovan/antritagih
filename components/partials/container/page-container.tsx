import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SiteBreadcrumb from "@/components/ui/site/site-breadcrumb";

export default function PageContainer({
  children,
  title,
  search = true,
  custom,
  onCreate,
}: {
  children: React.ReactNode;
  title: string;
  search?: boolean;
  custom?: React.ReactNode;
  onCreate?: () => void;
}) {
  return (
    <div>
      <SiteBreadcrumb />
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center py-4 px-5">
              <div className="flex-1 text-xl font-medium text-default-900">
                {title}
              </div>
              <div className="flex items-center space-x-4">
                {custom}

                {onCreate && (
                  <Button onClick={onCreate} size="sm">
                    Create
                  </Button>
                )}

                {search && (
                  <Input placeholder="Searh Data..." className="max-w-sm " />
                )}
              </div>
            </div>

            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
