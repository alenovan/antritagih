import NettRevenueReport from "@/components/blocks/dashboard/nett-revenue-report";
import GmvReport from "@/components/blocks/dashboard/gmv-report";
import { StatisticsBlock } from "@/components/blocks/dashboard/statistics-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChannelCost from "@/components/blocks/dashboard/channel-cost";
import ChannelEffectiveness from "@/components/blocks/dashboard/channel-effectiveness";

export default function DashboardView({
  gmvReports,
  nettRevenueReports,
  channelCosts,
  channelEffectiveness,
}: {
  gmvReports: GMVReport[];
  nettRevenueReports: NettRevenueReport[];
  channelCosts: ChannelCost[];
  channelEffectiveness: ChannelEffectiveness[];
}) {
  return (
    <div>
      <div className="grid grid-cols-12 items-center gap-5 mb-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4">
                <StatisticsBlock
                  title="Total Pendapatan"
                  total={"Rp 500,000,000"}
                  className="bg-info/10 border-none shadow-none"
                />
                <StatisticsBlock
                  title="Pembayaran Tertunda"
                  total={"Rp 120,000,000"}
                  className="bg-warning/10 border-none shadow-none"
                />
                <StatisticsBlock
                  title="Jumlah Pembayaran Terlambat"
                  total={"Rp 35,000,000"}
                  className="bg-danger/10 border-none shadow-none"
                />
                <StatisticsBlock
                  title="Total Transaksi"
                  total={(1250).toString()}
                  className="bg-primary/10 border-none shadow-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid xl:grid-cols-2  grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>GMV Report by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <GmvReport data={gmvReports} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nett Revenue Report by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <NettRevenueReport data={nettRevenueReports} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Cost by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ChannelCost data={channelCosts} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Effectiveness by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ChannelEffectiveness data={channelEffectiveness} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
