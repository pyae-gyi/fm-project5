import React, { useContext } from "react";
import { Context } from "./Context";
import { containsOnlyDigits } from "./checkInputField";
export default function TimeInput({ label }) {
  const { stateData, handleInputChanged } = useContext(Context);
  const { years, months, days } = stateData.birth;
  let placeholderText = "";
  let name = "";
  switch (label) {
    case "day":
      placeholderText = "DD";
      name = "days";
      break;
    case "month":
      placeholderText = "MM";
      name = "months";
      break;
    default:
      placeholderText = "YYYY";
      name = "years";
  }
  return (
    <div className="flex flex-col space-y-2">
      <span
        className={`tracking-[0.2rem] uppercase text-[11px] font-bold text-base  ${
          stateData.fieldsConditions[name] == "empty" ||
          stateData.fieldsConditions[name] == "invalid"
            ? "text-red-500"
            : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <div className="flex flex-col space-y-1">
        <input
          onChange={(e) => {
            const { name, value } = e.target;
            handleInputChanged(name, value);
          }}
          placeholder={placeholderText}
          value={label == "day" ? days : label == "month" ? months : years}
          name={name}
          className={`max-w-[124px] caret-slate-300 focus:border-violet-500
          focus:caret-violet-500 w-full border  outline-none 
          rounded-md p-3 font-bold text-xl ${
            stateData.fieldsConditions[name] == "empty" ||
            stateData.fieldsConditions[name] == "invalid"
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        <span className="text-[11px] italic text-red-500">
          {stateData.fieldsConditions[name] == "empty" &&
            "This field is required."}
          {stateData.fieldsConditions[name] == "invalid" &&
            (name !== "years"
              ? `Must be a valid ${label}`
              : !containsOnlyDigits(years)
              ? `Must be a valid year`
              : `Must be in the past`)}
        </span>
      </div>
    </div>
  );
}
