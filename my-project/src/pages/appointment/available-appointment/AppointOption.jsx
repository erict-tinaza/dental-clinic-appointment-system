import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppointOption = ({ option, setTreatment }) => {
  const [doctors, setDoctors] = useState([]);
  const { name, price, slots } = option;
  const navigate = useNavigate();

  const handleBooking = (op) => {
    setTreatment(op);
  };

  useEffect(() => {
    // Fetch doctors data from a JSON file or API
    const fetchDoctors = async () => {
      try {
        // Simulating an API call or reading from a JSON file
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyDoctorsData), 1000)
        );
        setDoctors(response);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="card shadow-xl ">
      <div className="card-body text-center ">
        <h2 className="text-2xl  font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          {name}
        </h2>
        <p>{slots.length === 0 && "Try Another Day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available
        </p>
        <p>Price: ${price}</p>
        <div className="card-actions justify-center">
          {doctors.length > 0 ? (
            <label
              onClick={() => handleBooking(option)}
              disabled={slots.length === 0}
              htmlFor="booking-modal"
              className="btn bg-blue-500 text-white font-bold"
            >
              Book Appointment
            </label>
          ) : (
            <label
              disabled
              htmlFor="booking-modal"
              className="btn btn-primary text-white font-bold"
            >
              Doctor not Available
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointOption;

// Dummy JSON data for doctors
const dummyDoctorsData = [
  {
    id: 1,
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    specialization: "Orthodontics",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    specialization: "Cosmetic Dentistry",
  },
  {
    id: 3,
    name: "Dr. Michael Johnson",
    email: "michael.johnson@example.com",
    specialization: "General Dentistry",
  },
];