import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
  } from "@material-tailwind/react";
import DentistService from '@/service/DentistService';

export function Dentist() {
  const [dentists, setDentists] = useState([]);

  useEffect(() => {
    DentistService.getDentists()
      .then((response) => {
        setDentists(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the dentists!', error);
      });
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Dentist List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Specialization", "Availability", "Experience", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dentists.map(({ dentist_id, first_name, last_name, specialization, is_available, years_of_experience }, key) => {
                const className = `py-3 px-5 ${
                  key === dentists.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={dentist_id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        {/* <Avatar alt={first_name} size="sm" variant="rounded" /> */}
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {first_name} {last_name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {specialization}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={is_available == 1 ? "green" : "blue-gray"}
                        value={is_available == 1 ? "Available" : "Unavailable"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {years_of_experience} years
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Details
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Dentist;
