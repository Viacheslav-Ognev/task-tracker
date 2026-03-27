import { useState } from "react";

export default function FocusScreen() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSecond(0);
  };

  const modalTimer = () => {};

  return (
    <div className=" min-h-screen bg-[#F2F2F7] pt-12 px-5 pb-32 flex flex-col items-center">
      <h1 className=" text-3xl font-bold text-black mb-12 tracking-tight w-full text-left">
        Focus Timer
      </h1>
      <button
        onClick={() => {
          modalTimer;
        }}
        className=" hover:scale-102 transition-transform"
      >
        <div className=" relative w-82 h-82 rounded-full border-12 border-gray-200 flex flex-col items-center justify-center shadow-inner mb-12">
          <h2 className=" text-6xl font-bolt text-gray-800 tracking-tight">
            {String(hours).padStart(2, "0")} :{String(minutes).padStart(2, "0")}
            :{String(second).padStart(2, "0")}
          </h2>
          <p className=" text-gray-400 font-medium mt-2"> Next: Break</p>
        </div>
      </button>

      <div className=" flex flex-col items-center gap-6 ">
        <button
          onClick={toggleTimer}
          className=" w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-gray-800 
                transition-transform hover:scale-105"
        >
          {isActive ? "⏸" : "▶️"}
        </button>

        <button
          onClick={() => {
            resetTimer;
          }}
          className=" text-gray-600 rounded-full flex items-center justify-center text-xl hover:scale-105 transition-transform"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
