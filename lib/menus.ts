export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};

export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
  resource?: string;
  restricted?: boolean;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {
  const menuConfig = [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard",
          label: t("dashboard"),
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home", // Dashboard icon
          submenus: [],
        },
      ],
    },
    {
      groupLabel: t("master"),
      id: "master",
      menus: [
        {
          id: "debitur",
          href: "/master/debitur",
          label: "Debitur",
          active: pathname.includes("/master/debitur"),
          icon: "heroicons-outline:user-group", // Debitur icon
          submenus: [],
          resource: "debitur",
          restricted: true,
        },
        {
          id: "price-channel",
          href: "/master/price-channel",
          label: "Price Channel",
          active: pathname.includes("/master/price-channel"),
          icon: "heroicons-outline:currency-dollar", // Price Channel icon
          submenus: [],
          resource: "price_channel",
          restricted: true,
        },
        {
          id: "client",
          href: "/master/client/parent",
          label: "Client",
          active: pathname.includes("/master/client"),
          icon: "heroicons-outline:user-group", // Client icon
          submenus: [
            {
              id: "client-parent",
              href: "/master/client/parent",
              label: "Client Parent",
              active: pathname.includes("/master/client/parent"),
              icon: "heroicons-outline:user-group",
              children: [],
            },
            {
              id: "client",
              href: "/master/client/child",
              label: "Client Child",
              active: pathname.includes("/master/client/child"),
              icon: "heroicons-outline:user-group",
              children: [],
            },
          ],
          resource: "client",
          restricted: true,
        },
      ],
    },
    {
      groupLabel: "Transactional",
      id: "transactional",
      menus: [
        {
          id: "agent-call-activity",
          href: "/transactional/agent-call-activity",
          label: "Agent Call Activity",
          active: pathname.includes("/transactional/agent-call-activity"),
          icon: "heroicons-outline:phone", // Agent Call Activity icon
          submenus: [],
          resource: "agent_call_activity",
          restricted: true,
        },
        {
          id: "rekap-payment-data",
          href: "/transactional/rekap-payment-data",
          label: "Rekap Payment Data",
          active: pathname.includes("/transactional/rekap-payment-data"),
          icon: "heroicons-outline:document-text", // Rekap Payment Data icon
          submenus: [],
          resource: "rekap_payment",
          restricted: true,
        },
        {
          id: "proviling-member",
          href: "/transactional/proviling-member",
          label: "User Profiling",
          active: pathname.includes("/transactional/proviling-member"),
          icon: "heroicons-outline:search", // Proviling Member icon
          submenus: [],
        },
        {
          id: "upload",
          href: "/transactional/upload",
          label: "Upload",
          active: pathname.includes("/transactional/upload"),
          icon: "heroicons-outline:arrow-up-on-square",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "User",
      id: "user",
      menus: [
        {
          id: "user",
          href: "/user/user",
          label: "User",
          active: pathname.includes("/user/user"),
          icon: "heroicons-outline:user-circle", // User icon
          submenus: [],
          resource: "user",
          restricted: true,
        },
        {
          id: "role",
          href: "/user/role",
          label: "Role",
          active: pathname.includes("/user/role"),
          icon: "heroicons-outline:key", // Role icon
          submenus: [],
          resource: "role",
          restricted: true,
        },
      ],
    },
  ];

  return menuConfig;
}

export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard",
          label: t("dashboard"),
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: t("master"),
      id: "master",
      menus: [
        {
          id: "debitur",
          href: "/master/debitur",
          label: "Debitur",
          active: pathname.includes("/master/debitur"),
          icon: "heroicons-outline:user-group", // Debitur icon
          submenus: [],
          resource: "debitur",
          restricted: true,
        },
        {
          id: "price-channel",
          href: "/master/price-channel",
          label: "Price Channel",
          active: pathname.includes("/master/price-channel"),
          icon: "heroicons-outline:currency-dollar", // Price Channel icon
          submenus: [],
          resource: "price_channel",
          restricted: true,
        },
        {
          id: "client",
          href: "/master/client/parent",
          label: "Client",
          active: pathname.includes("/master/client"),
          icon: "heroicons-outline:user-group", // Client icon
          submenus: [
            {
              href: "/master/client/parent",
              label: "Client Parent",
              active: pathname.includes("/master/client/parent"),
              icon: "heroicons-outline:user-group",
              children: [],
            },
            {
              href: "/master/client/child",
              label: "Client Child",
              active: pathname.includes("/master/client/child"),
              icon: "heroicons-outline:user-group",
              children: [],
            },
          ],
          resource: "client",
          restricted: true,
        },
      ],
    },
    {
      groupLabel: "Transactional",
      id: "transactional",
      menus: [
        {
          id: "agent-call-activity",
          href: "/transactional/agent-call-activity",
          label: "Agent Call Activity",
          active: pathname.includes("/transactional/agent-call-activity"),
          icon: "heroicons-outline:phone", // Agent Call Activity icon
          submenus: [],
          resource: "agent_call_activity",
          restricted: true,
        },
        {
          id: "rekap-payment-data",
          href: "/transactional/rekap-payment-data",
          label: "Rekap Payment Data",
          active: pathname.includes("/transactional/rekap-payment-data"),
          icon: "heroicons-outline:document-text", // Rekap Payment Data icon
          submenus: [],
          resource: "rekap_payment",
          restricted: true,
        },
        {
          id: "proviling-member",
          href: "/transactional/proviling-member",
          label: "User Profiling",
          active: pathname.includes("/transactional/proviling-member"),
          icon: "heroicons-outline:search", // Proviling Member icon
          submenus: [],
        },
        {
          id: "upload",
          href: "/transactional/upload",
          label: "Upload",
          active: pathname.includes("/transactional/upload"),
          icon: "heroicons-outline:arrow-up-on-square",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "User",
      id: "user",
      menus: [
        {
          id: "user",
          href: "/user/user",
          label: "User",
          active: pathname.includes("/user/user"),
          icon: "heroicons-outline:user-circle", // User icon
          submenus: [],
          resource: "user",
          restricted: true,
        },
        {
          id: "role",
          href: "/user/role",
          label: "Role",
          active: pathname.includes("/user/role"),
          icon: "heroicons-outline:key", // Role icon
          submenus: [],
          resource: "role",
          restricted: true,
        },
      ],
    },
  ];
}
