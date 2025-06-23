import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardDropdown from "@/components/dashboard-dropdown";
import { StatisticsBlock } from "@/components/blocks/statistics-block";
import OrdersBlock from "@/components/blocks/orders-block";
import EarningBlock from "@/components/blocks/earning-block";
import RecentActivity from "./components/recent-activity";
import GmvReport from "./components/gmv-report";
import NettRevenueReport from "./components/nett-revenue-report";
import ChannelCost from "./components/channel-cost";
import ChannelEffectiveness from "./components/channel-effectiveness";

// Dummy Data for Debt Collection Dashboard with Follow-Up Status
const dummyData = {
  totalRevenue: "Rp 500,000,000", // Converted to Rupiah
  pendingPayments: "Rp 120,000,000",
  overduePayments: "Rp 35,000,000",
  totalTransactions: 1250,
  companies: [
    {
      companyName: "Perusahaan A",
      customers: [
        {
          customerName: "Nasabah 1",
          amountDue: "Rp 15,000,000",
          waFollowedUp: true,
          phoneFollowedUp: true,
          emailFollowedUp: false,
        },
        {
          customerName: "Nasabah 2",
          amountDue: "Rp 5,000,000",
          waFollowedUp: true,
          phoneFollowedUp: false,
          emailFollowedUp: false,
        },
        {
          customerName: "Nasabah 3",
          amountDue: "Rp 7,000,000",
          waFollowedUp: false,
          phoneFollowedUp: true,
          emailFollowedUp: false,
        },
      ],
    },
    {
      companyName: "Perusahaan B",
      customers: [
        {
          customerName: "Nasabah 4",
          amountDue: "Rp 10,000,000",
          waFollowedUp: false,
          phoneFollowedUp: true,
          emailFollowedUp: true,
        },
        {
          customerName: "Nasabah 5",
          amountDue: "Rp 8,000,000",
          waFollowedUp: true,
          phoneFollowedUp: true,
          emailFollowedUp: true,
        },
        {
          customerName: "Nasabah 6",
          amountDue: "Rp 12,000,000",
          waFollowedUp: true,
          phoneFollowedUp: true,
          emailFollowedUp: false,
        },
      ],
    },
    {
      companyName: "Perusahaan C",
      customers: [
        {
          customerName: "Nasabah 7",
          amountDue: "Rp 18,000,000",
          waFollowedUp: true,
          phoneFollowedUp: false,
          emailFollowedUp: true,
        },
        {
          customerName: "Nasabah 8",
          amountDue: "Rp 9,000,000",
          waFollowedUp: false,
          phoneFollowedUp: false,
          emailFollowedUp: false,
        },
      ],
    },
  ],
  investedAmount: "Rp 10,000,000",
  overdueAmount: "Rp 3,500,000",
  transactionsData: [2000, 2500, 3000, 3500, 4000, 4500],
};

// Function to calculate follow-up stats per company
const calculateFollowUpStats = (company: any) => {
  let followUpStatus = {
    waFollowedUp: 0,
    phoneFollowedUp: 0,
    emailFollowedUp: 0,
  };
  let totalCustomers = company.customers.length;

  company.customers.forEach((customer: any) => {
    if (customer.waFollowedUp) followUpStatus.waFollowedUp += 1;
    if (customer.phoneFollowedUp) followUpStatus.phoneFollowedUp += 1;
    if (customer.emailFollowedUp) followUpStatus.emailFollowedUp += 1;
  });

  return {
    ...followUpStatus,
    totalCustomers,
    waNotFollowedUp: totalCustomers - followUpStatus.waFollowedUp,
    phoneNotFollowedUp: totalCustomers - followUpStatus.phoneFollowedUp,
    emailNotFollowedUp: totalCustomers - followUpStatus.emailFollowedUp,
  };
};

const DashboardPage = () => {
  // Calculate follow-up stats for each company
  const perusahaanAStats = calculateFollowUpStats(dummyData.companies[0]);
  const perusahaanBStats = calculateFollowUpStats(dummyData.companies[1]);
  const perusahaanCStats = calculateFollowUpStats(dummyData.companies[2]);

  return (
    <div>
      <div className="grid grid-cols-12 items-center gap-5 mb-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Key Billing Metrics */}
                <StatisticsBlock
                  title="Total Pendapatan"
                  total={dummyData.totalRevenue}
                  className="bg-info/10 border-none shadow-none"
                />
                <StatisticsBlock
                  title="Pembayaran Tertunda"
                  total={dummyData.pendingPayments}
                  className="bg-warning/10 border-none shadow-none"
                />
                <StatisticsBlock
                  title="Jumlah Pembayaran Terlambat"
                  total={dummyData.overduePayments}
                  className="bg-danger/10 border-none shadow-none"
                />
                <StatisticsBlock
                  title="Total Transaksi"
                  total={dummyData.totalTransactions.toString()}
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
            <GmvReport />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nett Revenue Report by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <NettRevenueReport />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Cost by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ChannelCost />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Effectiveness by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ChannelEffectiveness />
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid grid-cols-12 gap-5 mb-5">
        {dummyData.companies.map((company, index) => {
          const followUpStats = calculateFollowUpStats(company);
          return (
            <div className="lg:col-span-4 col-span-12" key={index}>
              <Card>
                <CardHeader className="flex flex-row items-center gap-1">
                  <CardTitle className="flex-1">
                    {company.companyName}
                  </CardTitle>
                  <DashboardDropdown />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 md:col-span-1">
                      <OrdersBlock
                        title="Follow-up WA"
                        total={`${followUpStats.waFollowedUp} / ${followUpStats.totalCustomers}`}
                        chartColor="#f1595c"
                        className="border-none shadow-none bg-default-50"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <OrdersBlock
                        title="Follow-up Telepon"
                        total={`${followUpStats.phoneFollowedUp} / ${followUpStats.totalCustomers}`}
                        chartColor="#4669fa"
                        chartType="line"
                        percentageContent={
                          <span className="text-primary">+2.5%</span>
                        }
                        className="border-none shadow-none bg-default-50"
                      />
                    </div>
                    <div className="col-span-2">
                      <EarningBlock
                        title="Follow-up Email"
                        total={`${followUpStats.emailFollowedUp} / ${followUpStats.totalCustomers}`}
                        percentage={`+08%`}
                        className="col-span-2 border-none shadow-none bg-default-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default DashboardPage;
