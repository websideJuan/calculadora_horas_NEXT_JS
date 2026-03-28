"use client";
import { useState } from "react";
import { date, getCurrentMonth, getCompleteDate } from "@/app/lib/date";
import { registerGuides } from "@/app/lib/data";
import { ListHours } from "./ListHours";




export  const Content = () => {
  const [activeMenuShow, setActiveMenuShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


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

 

  return (
    <div
      className={`h-dvh flex flex-col relative bg-gray-200 overflow-y-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/40 
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
        <div>
          {/* Desde: {hours.timeLine.getFullPeriod().startPeriod} <br />
          Hasta: {hours.timeLine.getFullPeriod().endPeriod} */}
        </div>
      </div>

      
      <ListHours handleClick={handleClick} />
      <div
        className={`bg-white shadow py-8 absolute w-full h-full 
        ${
          activeMenuShow ? "bottom-0 z-10" : "-bottom-full -z-10"
        } transition-all`}
      >
        <div className="mb-8 px-5">
          <h2 className="text-3xl font-semibold mb-2">Agregar guía</h2>
        </div>

        <form className="space-y-3 px-8 mb-4" action={registerGuides}>
          {/*Agrega el numero de guia como ID o clave primarea*/}
          <div className="flex items-center">
            <label htmlFor="numeroDeGuia" className="w-full text-lg">
              N° de Guía:
            </label>
            <input
              type="text"
              name="numeroDeGuia"
              id="numeroDeGuia"
              placeholder="062896"
              className="focus:outline-0 focus:border-b"
            />
          </div>

          {/*Campo hora inicio, selecciona la de inicio*/}
          <div className="flex items-center gap-2">
            <label htmlFor="horaInicio" className="w-full text-lg">
              Inicio:
            </label>
            <input
              type="text"
              name="horaInicio"
              id="horaInicio"
              placeholder="Hora de inicio."
              className="focus:outline-0"
            />
          </div>

          {/*Campo hora termino, selecciona la de termino*/}
          <div className="flex items-center gap-2">
            <label htmlFor="horaTermino" className="w-full text-lg">
              Termino:
            </label>
            <input
              type="text"
              name="horaTermino"
              id="horaTermino"
              placeholder="Hora de termino."
              className="focus:outline-0"
            />
          </div>

          {/*Campo hora llegada, selecciona la de llegada al taller*/}
          <div className="flex items-center gap-2">
            <label htmlFor="horaLLegada" className="w-full text-lg">
              Llegada:
            </label>
            <input
              type="text"
              name="horaLLegada"
              id="horaLLegada"
              placeholder="Hora de llegada"
              className="focus:outline-0"
            />
          </div>

          {/*Campo Maquinaria, selecciona la maquina por numero o por tonelaje*/}
          <div className="flex items-center gap-2">
            <label htmlFor="numeroMaquina" className="w-full text-lg">
              Maquina
            </label>
            <select
              name="numeroMaquina"
              id="numeroMaquina"
              className="focus:outline-0"
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
            <label htmlFor="totalHorasTrabajadas" className="w-full text-lg">
              Total horas:
            </label>
            <input
              type="text"
              name="totalHorasTrabajadas"
              id="totalHorasTrabajadas"
              placeholder="4.5"
              className="focus:outline-0"
            />
          </div>

          {/*Campo fecha: selecciona el dia actual o multiples dias.*/}
          <div className="grid grid-cols-3 gap-y-2">
            <label htmlFor="numeroDeGuia" className="w-full text-lg">
              Día
            </label>
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
              <div className="col-span-3 flex gap-4">
                <div>
                  <label htmlFor="diaInicio">Inicio</label>
                  <input
                    type="text"
                    name="diaInicio"
                    id="diaInicio"
                    placeholder={completeDate}
                    className="w-full text-3xl focus:outline-0"
                  />
                </div>
                <div>
                  <label htmlFor="diaFinal">Final</label>
                  <input
                    type="diaFinal"
                    name="diaFinal"
                    id="diaFinal"
                    placeholder={completeDate}
                    className="w-full text-3xl focus:outline-0"
                  />
                </div>
              </div>
            ) : (
              <div className="col-span-3 flex items-center justify-around">
                <span className="text-gray-600 text-5xl">{completeDate}</span>
                <div className="flex flex-col border border-gray-300 p-3 rounded-lg">
                  <p className="text-red-600">
                    {date.dayWeekName().toUpperCase()}
                  </p>
                  <p className="text-sm font-bold">
                    Valor: <span className="font-thin">{"(Super Extra)"}</span>
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

        <button
          className="w-10 h-10 flex items-center justify-center text-xl absolute top-2 right-2 font-bold"
          onClick={handleClick}
        >
          X
        </button>
      </div>


    </div>
  );
};
