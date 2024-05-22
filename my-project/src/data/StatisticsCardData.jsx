import { BanknotesIcon, UserPlusIcon, UsersIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import DentistService from "@/service/DentistService";
import { useState, useEffect } from "react";

const StatisticsCardsData = () => {
  const [dentistCount, setDentistCount] = useState(0);
  const [statisticsCardsData, setStatisticsCardsData] = useState([]);

  const getDentistCount = () => {
    DentistService.getCount()
      .then((response) => {
        setDentistCount(response.data.data.count);
      })
      .catch((error) => {
        console.error("There was an error fetching the dentists count!", error);
      });
  };

  useEffect(() => {
    getDentistCount();
  }, []);

  useEffect(() => {
    // Update statistics cards data whenever dentist count changes
    setStatisticsCardsData([
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
        value: dentistCount,
        //   footer: {
        //     color: "text-green-500",
        //     value: "+0%",
        //     label: "than yesterday",
        //   },
      },
    ]);
  }, [dentistCount]);

  return statisticsCardsData;
};

export default StatisticsCardsData;
