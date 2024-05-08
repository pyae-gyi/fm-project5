import React from "react";
import { useContext } from "react";
import { Context } from "./Context";
export default function Result() {
  const { stateData } = useContext(Context);

  return (
    <div className="font-extrabold text-5xl italic space-y-4">
      <p>
        <span className="text-violet-500">
          {stateData.age.years.length == 0 ? "--" : stateData.age.years}
        </span>{" "}
        years
      </p>
      <p>
        <span className="text-violet-500">
          {stateData.age.months.length == 0 ? "--" : stateData.age.months}
        </span>{" "}
        months
      </p>
      <p>
        <span className="text-violet-500">
          {stateData.age.days.length == 0 ? "--" : stateData.age.days}
        </span>{" "}
        days
      </p>
    </div>
  );
}
