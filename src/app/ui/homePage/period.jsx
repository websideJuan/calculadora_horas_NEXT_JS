"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const Period = ({ setDate }) => {
  let year = "2026";
  let month = new Date().getMonth();
  
  const [rangeDate, setRengeDate] = useState({
    startPeriodDate: {
      initDate: `24-${month}`,
      endDate: `${new Date(year, month, 0).getDate()}-${month}`,
    },
    endPeriodDate: {
      initDate: `01-${month + 1}`,
      endDate: `24-${month + 1}`,
    },
  });

  const handleChange = (e) => {
    let current = 4

    if(Number(e.target.dataset.num) < 0) {
      current--
    } else {
      current++
    }


    setRengeDate({
      ...rangeDate,
      [rangeDate.startPeriodDate]: {
        endDate: `${new Date(year, month + current, 0).getDate()}-${month + current}`,
      },
    });

    setDate(rangeDate);
  };

  return (
    <>
      <span>
        <button className="px-2 font-bold border border-amber-300" data-num="-1" onClick={handleChange}>
          {"<"}
        </button>
        Mar - 24-03
        <FontAwesomeIcon icon={faCalendarDay} />
      </span>
      <span>
        Abr - 24-04
        <FontAwesomeIcon icon={faCalendarDay} />
        <button
          className="px-2 font-bold border border-amber-300"
          data-num="1" onClick={handleChange}
        >
          {">"}
        </button>
      </span>
    </>
  );
};
