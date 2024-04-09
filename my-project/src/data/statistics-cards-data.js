//Data for the card widgets on dashboard

import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  // {
  //   color: "gray",
  //   icon: BanknotesIcon,
  //   title: "Today's Money",
  //   value: "$53k",
  //   footer: {
  //     color: "text-green-500",
  //     value: "+55%",
  //     label: "than last week",
  //   },
  // },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Today's Appointments",
    value: "10",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total No. of Patients",
    value: "1,000",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Total No. of Dentist",
    value: "$10",
    footer: {
      color: "text-green-500",
      value: "+0%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
