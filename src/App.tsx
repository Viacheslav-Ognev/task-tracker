import { useState, useEffect } from "react";
import NotesScreen from "./components/NotesScreen";
import FocusScreen from "./components/FocusScreen";
import TaskScreen from "./components/TaskScreen";
import { addDays, getDay, format } from "date-fns";
import ActivityScreen from "./components/ActivityScreen";

function App() {
  //const screen = ["Habit Tracker", "Notes", "Focus Timer"];
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const [activityLog, setActivityLog] = useState<Record<string, number>>(() => {
    const sevedLog = localStorage.getItem("tracker_activity");
    if (sevedLog) return JSON.parse(sevedLog);
    return{}
  });

  useEffect(() => {
    localStorage.setItem("tracker_activity", JSON.stringify(activityLog));
  }, [activityLog])

  const handleLogActivity = () => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    setActivityLog((prevLog) => ({
      ...prevLog,
      [todayStr]: (prevLog[todayStr] || 0) + 1,
    }));
  }
  
  return (
    <div className=" font-sans">
      {currentScreenIndex === 0 && (
        <div className=" animate-fade-in">
          <TaskScreen onTaskCompleted={handleLogActivity}/>
        </div>
      )}

      {currentScreenIndex === 1 && (
        <div className=" animate-fade-in">
          <NotesScreen />
        </div>
      )}

      {currentScreenIndex === 2 && (
        <div className=" animate-fade-in">
          <FocusScreen />
        </div>
      )}

      {currentScreenIndex === 3 && (
        <div className=" animate-fade-in">
          <ActivityScreen activityLog={activityLog} />
        </div>
      )}
      <div
        className=" min-w-full fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t 
      border-gray-200 flex justify-around items-center pb-8 pt-3 px-6 max-w-xl mx-auto z-40 "
      >
        <button
          onClick={() => setCurrentScreenIndex(0)}
          className={` flex flex-col items-center gap-1 transition-colors cursor-pointer
        ${
          currentScreenIndex === 0
            ? "text-black"
            : "text-gray-400 hover:text-gray-600"
        }`}
        >
          <span className=" text-2xl"> 📋 </span>
          <span className=" text-[10px] font-bold"> Habits </span>
        </button>

        <button
          onClick={() => setCurrentScreenIndex(1)}
          className={` flex flex-col items-center gap-1 transition-colors cursor-pointer
        ${
          currentScreenIndex === 1
            ? "text-black"
            : "text-gray-400 hover:text-gray-600"
        }`}
        >
          <span className=" text-2xl"> 📝 </span>
          <span className=" text-[10px] font-bold"> Notes </span>
        </button>

        <button
          onClick={() => setCurrentScreenIndex(2)}
          className={` flex flex-col items-center gap-1 transition-colors cursor-pointer
        ${
          currentScreenIndex === 2
            ? "text-black"
            : "text-gray-400 hover:text-gray-600"
        }`}
        >
          <span className=" text-2xl"> ⏱️ </span>
          <span className=" text-[10px] font-bold"> Focus </span>
        </button>

        <button
          onClick={() => setCurrentScreenIndex(3)}
          className={` flex flex-col items-center gap-1 transition-colors cursor-pointer
        ${
          currentScreenIndex === 2
            ? "text-black"
            : "text-gray-400 hover:text-gray-600"
        }`}
        >
          <span className=" text-2xl"> 📈 </span>
          <span className=" text-[10px] font-bold"> Activity </span>
        </button>
      </div>
    </div>
  );
}

export default App;
