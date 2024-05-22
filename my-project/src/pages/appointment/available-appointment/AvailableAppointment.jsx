import React, { useState } from "react";
import { format, isValid } from "date-fns";
import AppointOption from "./AppointOption";
import BookingModal from "../booking-modal/BookingModal";
import Header from "../../../partials/Header";
import Footer from "@/partials/Footer/Footer";
const AvailableAppointment = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);

  // Check if selectedDate is a valid date
  const isValidDate = isValid(selectedDate);

  const date = isValidDate ? format(selectedDate, "PP") : "";

  // Dummy JSON data
  const appointmentOptions = [
    {
      _id: 1,
      name: "Teeth Orthodontics",
      slots: ["09:00 AM", "10:30 AM", "04:30 PM"],
      price: 5000,
    },
    {
      _id: 2,
      name: "Cosmetic Dentistry",
      slots: ["08:00 AM", "11:00 AM", "03:00 PM"],
      price: 7000,
    },
    {
      _id: 3,
      name: "Teeth Cleaning",
      slots: ["09:30 AM", "01:00 PM", "05:00 PM"],
      price: 3000,
    },
  ];

  return (
    <>
    <Header/>
    <div className="flex flex-col min-h-screen overflow-hidden bg-white">
    <section className="mt-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* <p className="text-center text-4xl text-primary font-bold"> Available Appointment On:{date} </p> */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {appointmentOptions.map((option) => (
          <AppointOption
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          ></AppointOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          selectedDate={selectedDate}
          setTreatment={setTreatment}
          treatment={treatment}
        ></BookingModal>
      )}
    </section>
    <Footer/>
    </div>
    </>
  );
};

export default AvailableAppointment;