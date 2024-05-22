import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import Header from '../../partials/Header';

const fields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    required: true,
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john.doe@example.com",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+1 123-456-7890",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "123 Main St, City, Country",
    required: true,
  },
//   {
//     name: "password",
//     label: "Password",......................
//     type: "password..a
//     placeholder: "Enter your password",
//     required: true,
//   },
//   {
//     name: "confirmPassword",
//     label: "Confirm Password",
//     type: "password",
//     placeholder: "Confirm your password",
//     required: true,
//   },
];

export default function PatientRegForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    // Here you can perform further actions with the form data, like sending it to your server
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <div className="container mx-auto">
        <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">Patient Form</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label>
                  <input
                    {...register(field.name, {
                      required: field.required,
                      validate: field.name === "confirmPassword"
                        ? (value) =>
                            value === password || "Passwords do not match"
                        : undefined,
                    })}
                    className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                    }`}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                  {errors[field.name] && (
                    <span className="text-red-600">
                      {errors[field.name].message || "This field is required"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full text-left">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-blue-500 text-white text-md font-bold border border-blue-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-blue-500 lg:m-0 md:px-6"
                title="Finish Account Creation"
              >
                <span>Finish Account Creation</span>
                <HiOutlineArrowCircleRight size={20} />
              </button>
            </div>
          </form>
          <div className="text-sm text-gray-500 text-center mt-3">
            By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
