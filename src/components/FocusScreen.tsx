import { useEffect, useState } from "react";
import ModalSetTimer from "./ModalSetTimer";

export default function FocusScreen() {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [baseHours, setBaseHours] = useState(0);
  const [baseMinutes, setBaseMinutes] = useState(0);
  const [baseSeconds, setBaseSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if(isActive) {
      interval = setInterval(() => {
        if(second > 0 ) {
          setSecond((prev) => prev -1);
        } else {
          if(minutes >0) {
            setMinutes((prev) => prev -1);
            setSecond(59);
          } else {
            if(hours > 0) {
              setHours((prev) => prev -1);
              setMinutes(59);
              setSecond(59);
            } else {
              setIsActive(false);
              alert(" Time out! Time to rest");
              
              setHours(baseHours);
              setMinutes(baseMinutes);
              setSecond(baseSeconds);
            }
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval)
  },[isActive, hours, minutes, second])

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(baseHours);
    setMinutes(baseMinutes);
    setSecond(baseSeconds);
  };

  const handleSaveTimer = (h:number, m:number, s:number) => {
    setIsActive(false);

    setHours(h);
    setMinutes(m);
    setSecond(s);

    setBaseHours(h);
    setBaseMinutes(m);
    setBaseSeconds(s);

    setIsModalOpen(false)

  }

  return (
    <div className=" min-h-screen bg-[#F2F2F7] pt-12 px-5 pb-32 flex flex-col items-center">
      <h1 className=" text-3xl font-bold text-black mb-6 tracking-tight w-full text-left">
        Focus Timer
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className=" hover:scale-102 transition-transform"
      >
        <div className=" relative w-70 h-70 rounded-full border-12 border-gray-200 flex flex-col items-center justify-center shadow-inner mb-6">
          <h2 className=" text-6xl font-bold text-gray-800 tracking-tight">
            {String(hours).padStart(2, "0")} 
            :{String(minutes).padStart(2, "0")}
            :{String(second).padStart(2, "0")}
          </h2>
          <p className=" text-gray-400 font-medium mt-2"> Next: Break</p>
        </div>
      </button>

      <div className=" flex flex-col items-center gap-1 ">
        <button
          onClick={toggleTimer}
          className=" w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-gray-800 
                transition-transform hover:scale-105"
        >
          {isActive ? "⏸" : "▶️"}
        </button>

        <button
          onClick={resetTimer}
          className=" text-gray-600 rounded-full flex items-center justify-center text-xl hover:scale-105 transition-transform"
        >
          Reset
        </button>
      </div>

      {isModalOpen && (
        <ModalSetTimer
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTimer}
        currentH={hours}
        currentM={minutes}
        currentS={second}
        />
      )}

    </div>
  );
}
