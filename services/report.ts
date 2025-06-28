import fetchAPI, { ApiParameter } from "./api";

export async function getGMVReports({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return {
    status: true,
    message: "success",
    data: [
      {
        month: "2025-01",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-02",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-03",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-04",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-05",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-06",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-07",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-08",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-09",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-10",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-11",
        gmv: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-12",
        gmv: Math.floor(Math.random() * 10000000),
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<GMVReport[]>>({
    type: "server",
    method: "GET",
    endpoint: "/reporting/gmv-report",
    token: token,
    queryParams: query,
  });
}

export async function getNettRevenueReports({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return {
    status: true,
    message: "success",
    data: [
      {
        month: "2025-01",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-02",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-03",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-04",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-05",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-06",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-07",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-08",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-09",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-10",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-11",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-12",
        nett_revenue: Math.floor(Math.random() * 10000000),
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<NettRevenueReport[]>>({
    type: "server",
    method: "GET",
    endpoint: "/reporting/nett-revenue-report",
    token: token,
    queryParams: query,
  });
}

export async function getChannelCosts({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return {
    status: true,
    message: "success",
    data: [
      {
        month: "2025-01",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-02",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-03",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-04",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-05",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-06",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-07",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-08",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-09",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-10",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-11",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
      {
        month: "2025-12",
        channel: "Whatsapp",
        cost: Math.floor(Math.random() * 10000000),
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<ChannelCost[]>>({
    type: "server",
    method: "GET",
    endpoint: "/reporting/channel-cost-report",
    token: token,
    queryParams: query,
  });
}

export async function getChannelEffectiveness({
  token,
  query,
}: {
  token: string;
  query?: ApiParameter["queryParams"];
}) {
  return {
    status: true,
    message: "success",
    data: [
      {
        month: "2025-01",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-02",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-03",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-04",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-05",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-06",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-07",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-08",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-09",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-10",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-11",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
      {
        month: "2025-12",
        channel: "Whatsapp",
        effectiveness_score: Math.floor(Math.random() * 100),
      },
    ],
  };
  return fetchAPI<GeneralAPIFetchResponse<ChannelEffectiveness[]>>({
    type: "server",
    method: "GET",
    endpoint: "/reporting/channel-effectiveness-report",
    token: token,
    queryParams: query,
  });
}
