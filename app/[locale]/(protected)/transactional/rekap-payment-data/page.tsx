import { Card, CardContent } from "@/components/ui/card";
import SiteBreadcrumb from "@/components/ui/site/site-breadcrumb";
import PaymentHistory from "./table";

const ReactTablePage = () => {
  return (
    <div>
      <SiteBreadcrumb />
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <PaymentHistory />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReactTablePage;
