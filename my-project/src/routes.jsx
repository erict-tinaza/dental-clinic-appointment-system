import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Dentist, AppointmentSection, AppointmentHistory, Patient} from "@/pages/dashboard";
import UsersTable from '../src/pages/dashboard/UserTable';
import ManageDentists from "./pages/dashboard/ManageDentists";
import ManagePatients from "./pages/dashboard/ManagePatients";
import ManageAppointmentTypes from "./pages/dashboard/ManageAppointmentType";
import ManageAppointments from "./pages/dashboard/ManageAppointments";
import { SignIn, SignUp } from "@/pages/auth";
import { FaUserDoctor } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { MdMedicalServices } from "react-icons/md";



const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <FaUserDoctor {...icon} />,
        name: "dentist list",
        path: "/dentist",
        element: <Dentist />,
      },
      {
        icon: <FaUserDoctor {...icon} />,
        name: "Manage Dentist",
        path: "/manage-dentists",
        element: <ManageDentists />,
      },
      {
        icon: <IoPersonSharp {...icon} />,
        name: "patient list",
        path: "/patient",
        element: <Patient />,
      },
      {
        icon: <IoPersonSharp {...icon} />,
        name: "Manage Patients",
        path: "/manage-patients",
        element: <ManagePatients />,
      },
      
      {
        icon: <MdMedicalServices {...icon} />,
        name: "services",
        path: "/services",
        element: <ManageAppointmentTypes />,
      },

     {

        icon: <FaNotesMedical {...icon} />,
        name: "appointment section",
        path: "/appointment-section",
        element: <ManageAppointments />,
      },
      {

        icon: <MdWorkHistory {...icon} />,
        name: "appointment history",
        path: "/appointment-history",
        element: <Patient />,
      },
    ],
  },
  {
    title: "my account",
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
     
    ],
  },
];

export default routes;
