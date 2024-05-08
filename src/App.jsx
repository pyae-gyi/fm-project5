import TimeInput from "./TimeInput";
import iconArrow from "../assets/images/icon-arrow.svg";
import { useContext } from "react";
import { Context } from "./Context";
import Result from "./Result";
// https://digidates.de/api/v1/age/1970-01-01
function App() {
  const { stateData, handleCalculate } = useContext(Context);
  return (
    <>
      <div className="max-md:px-4 max-md:pt-[25%]  bg-slate-100 h-screen flex items-center justify-center">
        <div className="px-4 shadow-lg transition-[height] duration-75 ease-in-out max-w-[880px] w-[880px] py-10 rounded-lg bg-white rounded-br-[3.5rem]">
          <div className="flex gap-5">
            <TimeInput label="day" inputNum="24" />
            <TimeInput label="month" inputNum="09" />
            <TimeInput label="year" inputNum="1984" />
          </div>
          <div className="mt-10 mb-16 relative">
            <p className="border " />
            <div className="flex  absolute -translate-y-1/2 w-full justify-center md:justify-end">
              <button
                onClick={handleCalculate}
                className="p-3 w-16 aspect-square rounded-full bg-violet-500 active:bg-black flex items-center justify-center"
              >
                <img src={iconArrow} className="w-7" />
              </button>
            </div>
          </div>
          {stateData.isError ? (
            <div className="font-extrabold text-5xl italic ">
              Please Try Again!
            </div>
          ) : stateData.loading ? (
            <div className="font-extrabold text-5xl italic">Wait...</div>
          ) : (
            <Result />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
