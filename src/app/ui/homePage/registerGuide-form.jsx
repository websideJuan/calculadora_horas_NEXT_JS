"use client";
import { useState } from "react";
import { getCompleteDate } from "@/app/lib/date";
import { registerGuides } from "@/app/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { totalHourWorked } from "../../../../scripts/counterHours";
import { transformToHour } from "../../../../scripts/counterHours";

export const RegisterGuideForm = () => {
  const completeDate = getCompleteDate();
  const [totalHour, setTotalHour] = useState(0);
  const [defaultValue, setDefaultValue] = useState("");
  const [guideData, setGuideData] = useState({
    numbOfGuide: null,
    forklift_driver: 1,
    dateGuide: completeDate,
    enterprise: null,
    totalHoursWorked: 0,
    typePrice: "['normales', 'extras', 'superExtras']",
    normalHour: null,
    extraHour: null,
    superExtraHour: null,
    startHours: null,
    endHours: null,
    arrivalHours: null,
    numbMachine: null,
  });

  const [progress, setProgrss] = useState(0);
  const [toast, setToast] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({
    code: 0,
    text: "",
  });

  const handleChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    setGuideData({
      ...guideData,
      [nameInput]: valueInput,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalHoursWorked = transformToHour(
      totalHourWorked(guideData.startHours, guideData.arrivalHours),
    );
    const extraHour = Number(guideData.extraHour);
    const superExtraHour = Number(guideData.superExtraHour);

    guideData.superExtraHour = superExtraHour;
    guideData.extraHour = extraHour;
    guideData.normalHour = totalHoursWorked - extraHour - superExtraHour;
    guideData.totalHoursWorked = totalHoursWorked;

    console.log(guideData);

    const res = await registerGuides(guideData);

    const timeStamp = 300;
    let progressBar = timeStamp;

    setToast(true);

    setMessage({
      type: res.code,
      text: res.message,
    });

    setTimeout(() => {
      setShow(true);
    }, timeStamp);

    const id = setInterval(() => {
      progressBar--;
      setProgrss(progressBar);
      if (progressBar === 0) {
        clearInterval(id);
      }
    }, 10);

    setTimeout(() => {
      setShow(false);
      setToast(false);
      setMessage({});
    }, timeStamp * 10);
  };

  return (
    <>
      <div className="bg-amber-400 w-[90%] mx-auto h-40 rounded-4xl mb-9">
        <div className="flex justify-start items-end h-full ps-6 pb-6">
          <div className="flex flex-col gap-2 text-2xl">
            <FontAwesomeIcon icon={faFileArchive} />
            <span className="text-sm ms-1">Crear registro de guia</span>
          </div>
        </div>
      </div>
      {toast && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="flex justify-end items-end  h-full px-2 py-2 relative">
            <div
              className={`bg-amber-400 h-20 w-62.5 -translate-y-250 pointer-events-auto transition-transform  rounded-lg overflow-hidden ${show ? "translate-y-0" : "opacity-0"}`}
            >
              <div className="flex gap-3">
                Code:
                {message.type} -{message.text}
              </div>
              <span
                className={`absolute h-2 bg-amber-700/40 bottom-0 left-0 w-75`}
                style={{ width: `${progress}px` }}
              ></span>
            </div>
          </div>
        </div>
      )}
      <form className="space-y-3 px-6" onSubmit={handleSubmit}>
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
            defaultValue={defaultValue}
            onChange={handleChange}
          />
        </div>

        {/*Campo hora inicio, selecciona la de inicio*/}
        <div className="flex items-center gap-2">
          <label htmlFor="startHours" className="w-full text-lg text-gray-400">
            Inicio:
          </label>
          <input
            type="time"
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
            type="time"
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
            type="time"
            name="arrivalHours"
            id="arrivalHours"
            placeholder="Hora de llegada"
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        {/**/}
        <div className="flex items-center gap-2">
          <label htmlFor="extraHour" className="w-full text-lg text-gray-400">
            Hora extra
          </label>
          <input
            type="string"
            name="extraHour"
            id="extraHour"
            placeholder="Total de horas extras"
            className="focus:outline-0 placeholder:text-amber-500 text-amber-500"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="superExtraHour"
            className="w-full text-lg text-gray-400"
          >
            Hora S.Extra
          </label>
          <input
            type="string"
            name="superExtraHour"
            id="superExtraHour"
            placeholder="Total de horas super extras"
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
            <option value="null">--</option>
            <option value="1">45 {"(3 Toneladas)"}</option>
            <option value="2">5 Toneladas</option>
            <option value="3" disabled={true}>
              7 Toneladas
            </option>
          </select>
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
        <div className="flex items-center gap-2">
          <label htmlFor="dateGuide" className="w-full text-lg text-gray-400">
            Día
          </label>
          <input
            type="text"
            name="dateGuide"
            id="dateGuide"
            defaultValue={completeDate}
            onChange={handleChange}
            className="text-5xl focus:outline-0 placeholder:text-amber-500 text-amber-500"
          />
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
