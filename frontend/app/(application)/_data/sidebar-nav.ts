export type Sidemenu = (typeof sidemenu)[number];
import {
  LayoutDashboard,
  IndianRupee,
  FileBarChart2,
  User,
  Users,
  Truck,
} from "lucide-react";

export const sidemenu = [
  {
    submenu: "Menu",
    list: [
      {
        label: "Dasboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        label: "Customers",
        icon: Users,
        href: "/customers",
      },
      {
        label: "Trips",
        icon: Truck,
        href: "/trips",
      },
      {
        label: "Balance Sheet",
        icon: IndianRupee,
        href: "/balance-sheet",
      },
      {
        label: "Reports",
        icon: FileBarChart2,
        href: "/reports",
      },
    ],
  },
  {
    submenu: "Settings",
    list: [
      {
        label: "Profile",
        icon: User,
        href: "/profile?tab=personal",
      },
    ],
  },
];
