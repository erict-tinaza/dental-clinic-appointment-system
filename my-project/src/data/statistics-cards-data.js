import { UsersIcon, UserPlusIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import DentistService from "@/service/DentistService";
import PatientService from "@/service/PatientService";
import AppointmentService from "@/service/AppointmentService";

// Helper function to fetch the dentist count
const fetchDentistCount = async () => {
  try {
    const response = await DentistService.getCount();
    return response.data.data.count;
  } catch (error) {
    console.error("There was an error fetching the dentists count!", error);
    return 0; // Return a default value in case of an error
  }
};

// Helper function to fetch the patient count
const fetchPatientCount = async () => {
  try {
    const response = await PatientService.getCount();
    return response.data.data.count;
  } catch (error) {
    console.error("There was an error fetching the patients count!", error);
    return 0; // Return a default value in case of an error
  }
};

const fetchAppointmentCount = async () => {
  try {
    const response = await PatientService.getCount();
    return response.data.data.count;
  } catch (error) {
    console.error("There was an error fetching the appointments count!", error);
    return 0; // Return a default value in case of an error
  }
};

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Today's Appointments",
    value: "Loading...",
    footer: {
      color: "text-green-500",
      value: "+3%+",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total No. of Patients",
    value: "Loading...", // Set a default value while fetching the count
    footer: {
      color: "text-red-500",
      value: "",
      label: "",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Total No. of Dentist",
    value: "Loading...", // Set a default value while fetching the count
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
];

export { fetchDentistCount, fetchPatientCount, fetchAppointmentCount };