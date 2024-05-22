import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { CheckCircleIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import AppointmentService from '@/service/AppointmentService';

const DisplayAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch today's appointments from the API
        AppointmentService.getTodayAppointments()
            .then(response => setAppointments(response.data.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
            >
                <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                        Appointments for Today
                    </Typography>
                    <Typography
                        variant="small"
                        className="flex items-center gap-1 font-normal text-blue-gray-600"
                    >
                        <CheckCircleIcon className="h-4 w-4 text-blue-gray-200" />
                        <strong>{appointments.length} appointments</strong> today
                    </Typography>
                </div>
                <Menu>
                    <MenuHandler>
                        <IconButton size="sm" variant="text" color="blue-gray">
                            <EllipsisVerticalIcon className="h-6 w-6" />
                        </IconButton>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem>Action</MenuItem>
                        <MenuItem>Another Action</MenuItem>
                        <MenuItem>Something else here</MenuItem>
                    </MenuList>
                </Menu>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {["Appointment ID", "User ID", "Type", "Date", "Time", "Status", "Notes"].map(
                                (el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(
                            ({ appointment_id, user_id, appointment_type_id, date, time, status, notes }, key) => {
                                const className = `py-3 px-5 ${
                                    key === appointments.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                }`;

                                return (
                                    <tr key={appointment_id}>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {appointment_id}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {user_id}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {appointment_type_id}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {time}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {status}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {notes}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default DisplayAppointments;
