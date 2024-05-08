import React from "react";
import { useContext } from "react";
import { Context } from "./Context";
export default function Result() {
  const { stateData } = useContext(Context);
  const { years, months, days } = stateData.age;

  return (
    <div className="font-extrabold text-5xl italic space-y-4">
      <p>
        <span className="text-violet-500">
          {years.length == 0 ? "--" : years}
        </span>{" "}
        {years > 1 ? "years" : "year"}
      </p>
      <p>
        <span className="text-violet-500">
          {months.length == 0 ? "--" : months}
        </span>{" "}
        {months > 1 ? "months" : "month"}
      </p>
      <p>
        <span className="text-violet-500">
          {days.length == 0 ? "--" : days}
        </span>{" "}
        {days > 1 ? "days" : "day"}
      </p>
    </div>
  );
}
