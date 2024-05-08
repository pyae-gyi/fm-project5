import React, { useState, useEffect } from "react";

import App from "./App";
import { checkInputField } from "./checkInputField";

const Context = React.createContext("");
export default function ContextGuy() {
  const [stateData, setStateData] = useState({
    birth: {
      days: "",
      months: "",
      years: "",
    },
    age: {
      days: "",
      months: "",
      years: "",
    },
    loading: false,
    fieldsConditions: {
      days: "",
      months: "",
      years: "",
    },
    isError: false,
    isButtonGetClicked: false,
  });
  const calculateAge = async () => {
    const { years, months, days } = stateData.birth;
    setStateData((prevValue) => ({ ...prevValue, loading: true }));
    const response = await fetch(
      `https://digidates.de/api/v1/age/${years}-${months}-${days}`
    );
    const data = await response.json();
    setStateData((prevValue) => ({ ...prevValue, loading: false }));
    return data.ageextended;
  };

  const handleCalculate = () => {
    const moments = ["years", "months", "days"];
    const conditions = [];
    for (let i = 0; i < 3; i++) {
      // console.log(inputLabel, stateData.birth[moments[i]]);
      const { days, months, years } = stateData.birth;
      const date = `${days}-${months}-${years}`;
      const inputFieldCondition = checkInputField(
        moments[i],
        stateData.birth[moments[i]],
        date
      );
      setStateData((prevValue) => ({
        ...prevValue,
        fieldsConditions: {
          ...prevValue.fieldsConditions,
          [moments[i]]: inputFieldCondition,
        },
      }));
      conditions.push(inputFieldCondition);
    }
    if (conditions.includes("empty") || conditions.includes("invalid")) {
      setStateData((prevValue) => ({
        ...prevValue,
        isError: true,
        age: {
          days: "",
          months: "",
          years: "",
        },
      }));
    } else {
      setStateData((prevValue) => ({ ...prevValue, isError: false }));
    }
    setStateData((prevValue) => ({ ...prevValue, isButtonGetClicked: true }));
  };

  const handleInputChanged = (inputLabel, value) => {
    switch (inputLabel) {
      case "days":
        setStateData((prevValue) => ({
          ...prevValue,
          birth: { ...prevValue.birth, days: value },
        }));

        break;
      case "months":
        setStateData((prevValue) => ({
          ...prevValue,
          birth: { ...prevValue.birth, months: value },
        }));

        break;
      case "years":
        setStateData((prevValue) => ({
          ...prevValue,
          birth: { ...prevValue.birth, years: value },
        }));

        break;
    }
  };
  const contextData = { stateData, handleCalculate, handleInputChanged };

  useEffect(() => {
    if (!stateData.isError && stateData.isButtonGetClicked) {
      calculateAge().then((data) =>
        setStateData((prevValue) => ({
          ...prevValue,
          age: { ...data },
        }))
      );
    }
    setStateData((prevValue) => ({ ...prevValue, isButtonGetClicked: false }));
  }, [stateData.isButtonGetClicked, setStateData.isError]);
  return (
    <Context.Provider value={contextData}>
      <App />
    </Context.Provider>
  );
}

export { Context };
