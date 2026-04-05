"use client";
import { useState } from "react";
import { totalHourWorked } from "../../../scripts/counterHours";

export default function Page() {
  const [resData, setResData] = useState({
    success: false,
    type: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    start: "",
    end: "",
    arrival: "",
  });

  const getData = (data) => {
    const isEmpty = Object.values(data)
      .map((d, i) => d.includes("0") || d === "")
      .find((d) => d === true);

    console.log(isEmpty);

    if (isEmpty) {
      return {
        success: true,
        type: "danger",
        message: "No puede enviar los campos vacios!",
      };
    }

    return {
      success: true,
      type: "success",
      message: "Date added success",
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startHour = formData.start;
    const endHour = formData.arrival;
    const [start, end] = totalHourWorked(startHour, endHour);

    

    const res = getData({
      ...formData,
      totalHour: [start, dicMinute[end]].join("."),
    });

    setResData(res);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-xl w-full mx-auto">
      <div className="w-[90%] mx-auto">
        <h2 className="text-2xl text-gray-500 block mb-5">Registrar guía</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-amber-500 p-2 py-8 rounded-xl"
        >
          <div className="mb-3 px-3 gap-3 flex flex-col">
            <label htmlFor="inicio" className="font-bold uppercase">
              Inicio:
            </label>
            <input
              type="time"
              id="inicio"
              name="start"
              placeholder="Inicio"
              data-select={"true"}
              className="text-white w-full ps-3 placeholder:text-white focus:outline-0 focus:bg-gray-600/50"
              onChange={handleChange}
            />
            {"Salida del taller"}
          </div>
          <div className="mb-3 px-3 gap-3 flex flex-col">
            <label htmlFor="termino" className="font-bold uppercase">
              Termino:
            </label>
            <input
              type="time"
              id="termino"
              name="end"
              placeholder="Termino"
              data-select={"true"}
              className="text-white w-full ps-3 placeholder:text-white focus:outline-0 focus:bg-gray-600/50"
              onChange={handleChange}
            />
            {"Termino del trabajo"}
          </div>
          <div className="mb-3 px-3 gap-3 flex flex-col">
            <label htmlFor="llegada" className="font-bold uppercase">
              Llegada:
            </label>
            <input
              type="time"
              id="llegada"
              name="arrival"
              placeholder="Llegada"
              data-select={"true"}
              className="text-white w-full ps-3 placeholder:text-white focus:outline-0 focus:bg-gray-600/50"
              onChange={handleChange}
            />
            {"Hora de llegada al taller"}
          </div>

          <button className="border border-gray-500 py-1 w-[136px] rounded-2xl ml-full">
            Agregar
          </button>
        </form>
      </div>
      {resData.success && <div className="bg-red-300/50">{resData.message}</div>}
    </div>
  );
}
