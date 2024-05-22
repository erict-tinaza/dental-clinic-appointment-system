import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
  const { name, slots, price, doctors } = treatment;
  const [singleUser, setSingleUser] = useState({
    _id: "63f5e7f6a8f7e4b7c8e0b8b8",
    name: "John Doe",
    email: "john@example.com",
  });

  const [value, setValue] = useState("");
  const [date, setDate] = useState([]);
  const [slot, setSlot] = useState([]);
  const [value1, setValue1] = useState("");
  const navigate = useNavigate();

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const patient_name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const slot = form.slot.value;
    const doctor = form.doc.value;
    const AppointmentDate = form.date1.value;
    const booking = {
      patient_id: singleUser?._id,
      patient_name: patient_name,
      slot,
      AppointmentDate,
      patient_email: email,
      patient_Phone: phone,
      doctor_email: doctor,
      treatment: name,
      price,
      isPaid: false,
    };

    // Simulate server response
    const serverResponse = {
      status: "Success",
      message: "Booking Confirmed",
    };

    if (serverResponse.status === "Success") {
      toast.success(serverResponse.message);
      setTreatment(null);
    } else {
      toast.error(serverResponse.message);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSlot = (e) => {
    setValue1(e.target.value);
    date.docSlot.map((p) => {
      if (p.date === e.target.value) {
        setSlot(p.slot);
      }
    });
  };

  // Dummy data for date and slots
  useEffect(() => {
    const dummyData = {
      data: {
        docSlot: [
          { date: "2023-05-01", slot: ["09:00 AM", "10:30 AM", "04:30 PM"] },
          { date: "2023-05-02", slot: ["08:00 AM", "11:00 AM", "03:00 PM"] },
          { date: "2023-05-03", slot: ["09:30 AM", "01:00 PM", "05:00 PM"] },
        ],
      },
    };
    setDate(dummyData.data);
  }, [value]);

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal bg-white">
        <div className="modal-box relative bg-white">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center font-bold  text-blue-600">
            {name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-5 bg-white"
          >
            {/* <input type="text" disabled value={format(selectedDate, 'PP')} className="input input-bordered input-info w-full " /> */}
            <label className="label">
              <span className="label-text">Please Select a Doctor</span>
            </label>
            <select
              name="doc"
              value={value}
              onChange={handleChange}
              defaultValue={{ label: "Select" }}
              className="select select-bordered w-full bg-white"
            >
              <option>Choose One</option>
              {doctors?.map((doc, i) => (
                <option key={i} value={doc.docEmail}>
                  {doc.name}
                </option>
              ))}
            </select>
            <label className="label">
              <span className="label-text">Please Select a Date</span>
            </label>
            {date?.length === 0 ? (
              <>
                {" "}
                <input
                  disabled
                  readOnly
                  type="email"
                  placeholder="Please Select a doctor first"
                  className="input input-bordered input-info w-full bg-white"
                />
              </>
            ) : (
              <>
                <select
                  name="date1"
                  value={value1}
                  onChange={handleSlot}
                  className="select select-bordered w-full bg-white"
                >
                  <option>Choose One</option>{" "}
                  {date?.docSlot?.map((s, i) => (
                    <option key={i} value={s.date}>
                      {s.date}
                    </option>
                  ))}
                </select>
              </>
            )}
            <label className="label">
              <span className="label-text bg-white">Please Select a Slot</span>
            </label>
            {slot?.length === 0 ? (
              <>
                {" "}
                <input
                  disabled
                  readOnly
                  type="email"
                  placeholder="Please Select a slot"
                  className="input input-bordered input-info w-full bg-white"
                />
              </>
            ) : (
              <>
                <select name="slot" className="select select-bordered w-full bg-white">
                  <option>Choose One</option>
                  {slot?.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
            )}
            <input
              name="name"
              defaultValue={singleUser?.name}
              disabled
              readOnly
              type="name"
              placeholder="Your Name"
              className="input input-bordered input-info w-full bg-white"
            />
            <input
              name="email"
              defaultValue={singleUser?.email}
              disabled
              readOnly
              type="email"
              placeholder="Email Address"
              className="input input-bordered input-info w-full bg-white"
            />
            <input
              name="phone"
              type="phone"
              placeholder="Phone Number"
              className="input input-bordered input-info w-full bg-white"
            />
            <br />
            <input
              type="submit"
              className="w-full btn bg-blue-500"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;