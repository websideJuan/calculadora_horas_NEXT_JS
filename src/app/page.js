import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { ListHours } from "./ui/homePage/ListHours";
import { montserrat } from "./ui/fonts";
import { hours } from "./lib/hours";

export default function Page() {
  hours.createHours()
  const priceOfHours = [
    {typePrice: 'Normal', price: 1400},
    {typePrice: 'Extra', price: 1400},
    {typePrice: 'Super extra', price: 1400}
  ]
  
  return (
    <div className="max-w-lg w-full mx-auto px-5">
      <div className="py-4">
        <div className="border-b border-b-amber-500 mb-4">
          <p className="text-gray-400 font-bold uppercase text-xs">Periodo</p>
          <div className="text-amber-500 flex justify-between">
            <Period />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {hours.hours.map((hour) =>
            hour.map((total, i) => (
              <div
                key={i}
                className={`flex items-center justify-between text-white border-b border-amber-400 ${i === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="text-zinc-900 bg-amber-500 rounded-3xl w-40 ps-6 text-sm">
                  <p>{priceOfHours[i].typePrice}</p>
                  <p>Bono ${(total * priceOfHours[i].price).toLocaleString()}</p>
                </div>
                <div>
                  <div className={`text-8xl ${montserrat.className}`}>
                    <span>{total}</span>
                  </div>
                </div>
              </div>
            )),
          )}
        </div>
      </div>
      <div>
        <ListHours />
      </div>
    </div>
  );
}

const Period = () => {
  return (
    <>
      <span>
        Mar - {hours.timeLine.getFullPeriod().startPeriod}{" "}
        <FontAwesomeIcon icon={faCalendarDay} />
      </span>
      <span>
        Abr - {hours.timeLine.getFullPeriod().endPeriod}{" "}
        <FontAwesomeIcon icon={faCalendarDay} />
      </span>
    </>
  );
};
