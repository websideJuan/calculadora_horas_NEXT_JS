"use client";
import { useState } from "react";
import { date, getCurrentMonth, getCompleteDate } from "@/app/lib/date";
import { registerGuides } from "@/app/lib/data";
import { ListHours } from "./ListHours";

export const Content = () => {
  const [activeMenuShow, setActiveMenuShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [valueInputNofOrden, setValueInputNofOrden] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const months = date.months;
  const completeDate = getCompleteDate();
  const numberCurrentMonth = getCurrentMonth();
  const currentMonth = months[numberCurrentMonth];
  const lastMonth = months[numberCurrentMonth - 1];

  const handleClick = () => {
    setActiveMenuShow(!activeMenuShow);
  };

  const handleChange = (e) => {
    if (e.target.name === "cuantosDias") {
      setIsChecked(!isChecked);
    }
  };

  const handleSubmit = async (e) => {
    const res = await registerGuides(e);
    console.log(res);
    
    if (!res.success) {
      setError({
        error: true,
        message: res.message
      });
      return;
    }

    if (typeof res === "object") {
      setValueInputNofOrden(res.result[0].numb_of_guide);
    }

    setError({
      error: false,
      message: ""
    });
  };

  return (
    <div
      className={`flex flex-col bg-gray-200 overflow-y-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/40 
        ${
          activeMenuShow
            ? "before:opacity-100 before:z-10"
            : "before:opacity-0 before:-z-50"
        } transition-all`}
    >
      <div className="p-9 py-5 shadow bg-white space-y-3">
        <h1 className="text-3xl">Horas Trabajadas</h1>
        <p className="leading-4">
          Todas las horas se veran reflejadas por periodos de trabajos mensuales
          <a href="#" className="text-blue-600">
            saber más
          </a>
          .
        </p>
      </div>

      <div className="flex justify-between p-6 py-3 bg-amber-100 text-sm">
        <div className="text-gray-800">
          <p>Periodo actual:</p>
          <p className="uppercase">{lastMonth + "-" + currentMonth}</p>
        </div>
      </div>

      <ListHours handleClick={handleClick} />

      <div
        className={`fixed w-[90%] h-full right-0 top-0 bottom-0 bg-white
        ${
          activeMenuShow ? "translate-0 z-10" : "translate-x-full -z-10"
        } transition-transform`}
      >
        <div className="bg-cyan-800">
          <button
            className="w-12 h-12 flex items-center text-2xl justify-center text-white ms-auto active:bg-gray-600"
            onClick={handleClick}
          >
            X
          </button>
        </div>
        <div className="py-6 px-3">
          <div className="border border-gray-400 py-3 px-4 rounded-2xl flex flex-col mb-4">
            <h4 className="text-lg">Agregar nueva guía.</h4>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </div>

          <form className="space-y-3 px-3" action={(e) => handleSubmit(e)}>
            {/*Agrega el numero de guia como ID o clave primarea*/}
            <div className="flex items-center">
              <label htmlFor="numbOfGuide" className="w-full text-lg">
                N° de Guía:
              </label>
              <input
                type="text"
                name="numbOfGuide"
                id="numbOfGuide"
                placeholder="062896"
                className="focus:outline-0 focus:border-b"
                defaultValue={valueInputNofOrden}
                onChange={handleChange}
              />
            </div>

            {/*Campo hora inicio, selecciona la de inicio*/}
            <div className="flex items-center gap-2">
              <label htmlFor="startHours" className="w-full text-lg">
                Inicio:
              </label>
              <input
                type="text"
                name="startHours"
                id="startHours"
                placeholder="Hora de inicio."
                className="focus:outline-0"
                onChange={handleChange}
              />
            </div>

            {/*Campo hora termino, selecciona la de termino*/}
            <div className="flex items-center gap-2">
              <label htmlFor="endHours" className="w-full text-lg">
                Termino:
              </label>
              <input
                type="text"
                name="endHours"
                id="endHours"
                placeholder="Hora de termino."
                className="focus:outline-0"
                onChange={handleChange}
              />
            </div>

            {/*Campo hora llegada, selecciona la de llegada al taller*/}
            <div className="flex items-center gap-2">
              <label htmlFor="arrivalHours" className="w-full text-lg">
                Llegada:
              </label>
              <input
                type="text"
                name="arrivalHours"
                id="arrivalHours"
                placeholder="Hora de llegada"
                className="focus:outline-0"
                onChange={handleChange}
              />
            </div>

            {/*Campo Maquinaria, selecciona la maquina por numero o por tonelaje*/}
            <div className="flex items-center gap-2">
              <label htmlFor="numbMachine" className="w-full text-lg">
                Maquina
              </label>
              <select
                name="numbMachine"
                id="numbMachine"
                className="focus:outline-0"
                onChange={handleChange}
              >
                <option value="45">45 {"(3 Toneladas)"}</option>
                <option value="5TON">5 Toneladas</option>
                <option value="7TON" disabled={true}>
                  7 Toneladas
                </option>
              </select>
            </div>

            {/*Campo total horas, selecciona las horas totales trabajadas.*/}
            <div className="flex items-center gap-2">
              <label htmlFor="totalHoursWorked" className="w-full text-lg">
                Total horas:
              </label>
              <input
                type="text"
                name="totalHoursWorked"
                id="totalHoursWorked"
                placeholder="4.5"
                className="focus:outline-0"
                onChange={handleChange}
              />
            </div>

            {/*Campo Empresa, ingresa la empresa donde trabajaste.*/}
            <div className="flex items-center gap-2">
              <label htmlFor="enterprise" className="w-full text-lg">
                Empresa:
              </label>
              <input
                type="text"
                name="enterprise"
                id="enterprise"
                placeholder="Nombre empresa"
                className="focus:outline-0"
                onChange={handleChange}
              />
            </div>

            {/*Campo fecha: selecciona el dia actual o multiples dias.*/}
            <div className="grid grid-cols-3 gap-y-2">
              <label className="w-full text-lg">Día</label>
              <label
                htmlFor="cuantosDias"
                className="text-gray-600 text-end flex items-center gap-3 col-span-2"
              >
                <span>Fecha diferente</span>
                <input
                  type="checkbox"
                  name="cuantosDias"
                  id="cuantosDias"
                  className=""
                  onChange={handleChange}
                />
              </label>
              {isChecked ? (
                <div className="col-span-3">
                  <label htmlFor="diaInicio">Digte el dia</label>
                  <input
                    type="text"
                    name="otherDay"
                    id="otherDay"
                    placeholder={completeDate}
                    className="w-full text-3xl focus:outline-0"
                  />
                </div>
              ) : (
                <div className="col-span-3 flex items-center justify-around">
                  <span className="text-gray-600 text-5xl">{completeDate}</span>
                  <div className="flex flex-col border border-gray-300 p-3 rounded-lg">
                    <p className="text-red-600">
                      {date.dayWeekName().toUpperCase()}
                    </p>
                    <p className="text-sm font-bold">
                      Valor:{" "}
                      <span className="font-thin">{"(Super Extra)"}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-emerald-500 uppercase px-3 py-3 text-white w-full"
            >
              Ingrsar horas
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
