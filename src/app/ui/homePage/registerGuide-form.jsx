"use client";
import { useState } from "react";
import { date, getCompleteDate } from "@/app/lib/date";
import { registerGuides } from "@/app/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArchive } from '@fortawesome/free-solid-svg-icons'


export const RegisterGuideForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const completeDate = getCompleteDate();

  const handleChange = (e) => {
    if (e.target.name === "cuantosDias") {
      setIsChecked(!isChecked);
    }
  };

  const handleSubmit = async (e) => {
    const res = await registerGuides(e);

    if (!res.success) {
      return;
    }
  };

  return (
    <>
      <div className="bg-amber-400 w-[90%] mx-auto h-40 rounded-4xl mb-9">
        <div className="flex justify-start items-end h-full ps-6 pb-6">

          <div className="flex flex-col gap-2 text-2xl">
            <FontAwesomeIcon icon={faFileArchive} />
            <span className="text-sm">Crear registro de guia</span>
          </div>
        </div>
      </div>
      <form className="space-y-3 px-6" action={(e) => handleSubmit(e)}>
        {/*Agrega el numero de guia como ID o clave primarea*/}
        <div className="flex items-center">
          <label htmlFor="numbOfGuide" className="w-full text-lg text-gray-400">
            N° de Guía:
          </label>
          <input
            type="text"
            name="numbOfGuide"
            id="numbOfGuide"
            placeholder="062896"
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        {/*Campo hora inicio, selecciona la de inicio*/}
        <div className="flex items-center gap-2">
          <label htmlFor="startHours" className="w-full text-lg text-gray-400">
            Inicio:
          </label>
          <input
            type="text"
            name="startHours"
            id="startHours"
            placeholder="Hora de inicio."
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        {/*Campo hora termino, selecciona la de termino*/}
        <div className="flex items-center gap-2">
          <label htmlFor="endHours" className="w-full text-lg text-gray-400">
            Termino:
          </label>
          <input
            type="text"
            name="endHours"
            id="endHours"
            placeholder="Hora de termino."
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        {/*Campo hora llegada, selecciona la de llegada al taller*/}
        <div className="flex items-center gap-2">
          <label
            htmlFor="arrivalHours"
            className="w-full text-lg text-gray-400"
          >
            Llegada:
          </label>
          <input
            type="text"
            name="arrivalHours"
            id="arrivalHours"
            placeholder="Hora de llegada"
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        {/*Campo Maquinaria, selecciona la maquina por numero o por tonelaje*/}
        <div className="flex items-center gap-2">
          <label htmlFor="numbMachine" className="w-full text-lg text-gray-400">
            Maquina
          </label>
          <select
            name="numbMachine"
            id="numbMachine"
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
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
          <label
            htmlFor="totalHoursWorked"
            className="w-full text-lg text-gray-400"
          >
            Total horas:
          </label>
          <input
            type="text"
            name="totalHoursWorked"
            id="totalHoursWorked"
            placeholder="4.5"
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        {/*Campo Empresa, ingresa la empresa donde trabajaste.*/}
        <div className="flex items-center gap-2">
          <label htmlFor="enterprise" className="w-full text-lg text-gray-400">
            Empresa:
          </label>
          <input
            type="text"
            name="enterprise"
            id="enterprise"
            placeholder="Nombre empresa"
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        {/*Campo fecha: selecciona el dia actual o multiples dias.*/}
        <div className="grid grid-cols-3 gap-y-2">
          <h5 className="w-full text-lg text-gray-400">Día</h5>
          <label
            htmlFor="cuantosDias"
            className="text-gray-600 text-end flex items-center gap-3 col-span-2"
          >
            <span>Fecha diferente</span>
            <input
              type="checkbox"
              name="cuantosDias"
              id="cuantosDias"
              className="appearance-none size-4 border border-gray-300 rounded-xs checked:bg-amber-500 checked:border-transparent focus:outline-none transition-all"
              onChange={handleChange}
            />
          </label>
          {isChecked ? (
            <div className="col-span-3 flex justify-around items-center">
              <label htmlFor="otherDay" className="text-gray-500">
                Dia diferente
              </label>
              <input
                type="text"
                name="otherDay"
                id="otherDay"
                placeholder={completeDate}
                className="text-5xl focus:outline-0 placeholder:text-amber-500 text-amber-500"
              />
            </div>
          ) : (
            <div className="col-span-3 flex items-center justify-around">
              <span className="text-amber-500 text-5xl">{completeDate}</span>
              <div className="flex flex-col border border-gray-300 p-3 rounded-lg">
                <p className="text-red-400">
                  {date.dayWeekName().toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-amber-500 px-6 py-3 text-white rounded-4xl active:bg-amber-700"
        >
          Ingresar horas
        </button>
      </form>
    </>
  );
};
