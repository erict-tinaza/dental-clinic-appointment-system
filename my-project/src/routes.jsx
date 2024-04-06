import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Dentist, AppointmentSection, AppointmentHistory, Patient} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { FaUserDoctor } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";


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
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },<FaNotesMedical /><MdWorkHistory />
      {

        icon: <FaUserDoctor {...icon} />,
        name: "dentist",
        path: "/dentist",
        element: <Dentist />,
      },
     {

        icon: <FaNotesMedical {...icon} />,
        name: "appointment section",
        path: "/appointment-section",
        element: <AppointmentSection />,
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
    // title: "auth pages",
    // layout: "auth",
    // pages: [
    //   {
    //     icon: <ServerStackIcon {...icon} />,
    //     name: "sign in",
    //     path: "/sign-in",
    //     element: <SignIn />,
    //   },
    //   {
    //     icon: <RectangleStackIcon {...icon} />,
    //     name: "sign up",
    //     path: "/sign-up",
    //     element: <SignUp />,
    //   },
    // ],
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
