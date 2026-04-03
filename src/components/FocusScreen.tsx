import { useEffect, useState } from "react";
import ModalSetTimer from "./ModalSetTimer";

export default function FocusScreen() {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false)

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
              setIsFinished(true)

              //setHours(baseHours);
              //setMinutes(baseMinutes);
              //setSecond(baseSeconds);
            }
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval)
  },[isActive, hours, minutes, second])

  const toggleTimer = () => {

    if(hours === 0 && minutes===0 && second===0) return

    setIsActive(!isActive);
    setIsFinished(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFinished(false)

    setHours(baseHours);
    setMinutes(baseMinutes);
    setSecond(baseSeconds);
  };

  const handleSaveTimer = (h:number, m:number, s:number) => {
    setIsActive(false);
    setIsFinished(false);

    setHours(h);
    setMinutes(m);
    setSecond(s);

    setBaseHours(h);
    setBaseMinutes(m);
    setBaseSeconds(s);

    setIsModalOpen(false)

  }



  const totalBaseSecond = baseHours * 3600 + baseMinutes * 60 + baseSeconds;
  const currentTotalSecond = hours * 3600 + minutes * 60 + second;
  const percentage = totalBaseSecond > 0 ? currentTotalSecond / totalBaseSecond : 0 

  const radius = 154;
  const circumference = 2 * Math.PI * radius;
  const strokeDeahoffset = -(circumference - percentage * circumference)


  return (
    <div className=" min-h-screen bg-[#F2F2F7] pt-12 px-5 pb-32 flex flex-col items-center">
      <h1 className=" text-3xl font-bold text-black mb-6 tracking-tight w-full text-left">
        Focus Timer
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative rounded-full w-72 h-72 outline-none mb-12 hover:scale-102 transition-transform duration-300"

      >
        <div 
        className={` absolute inset-0 rounded-full transition-all duration-1000 else-in-out
        ${ isFinished ? " shadow-[0_0_80px_rgba(239,68,68,0.8)] animate-pulse " : "shadow-none"} `}/>

        <div>

          <svg viewBox="0 0 320 320" className=" absolute inset-0 w-full h-full transform -rotate-90 z-10">

            <circle
            cx="160" cy="160" r={radius}
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="12"
            />

            <circle
            cx="160" cy="160" r={radius}
            fill="transparent"
            stroke="#000"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDeahoffset}
            className=" transition-all duration-1000 ease-linear"
            />

          </svg>
          
          <div className=" absolute inset-0 flex flex-col items-center justify-center pt-4 z-20">
            <h2 className=" text-6xl font-bold text-gray-800 tracking-tight">
              {String(hours).padStart(2, "0")} 
              :{String(minutes).padStart(2, "0")}
              :{String(second).padStart(2, "0")}
            </h2>
            <p className=" text-gray-400 font-medium mt-2"> Next: Break</p>
          </div>

        </div>
      </button>

      <div className=" flex flex-col items-center gap-1 ">
        <button
          onClick={toggleTimer}
          className=" w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-gray-800 
                transition-transform hover:scale-105"
        >
          {isActive ?      
          <span>  
            <svg className=" fill-white" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" stroke="#1C274C" stroke-width="1.5"/>
            <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" stroke="#1C274C" stroke-width="1.5"/>
            </svg>
          </span> 
          : 
          <span>  
              <svg className=" fill-white" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z" stroke="#1C274C" stroke-width="1.5"/>
            </svg> 
          </span> }
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
