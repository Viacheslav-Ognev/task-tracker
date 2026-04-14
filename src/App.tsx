import { useState, useEffect } from "react";
import NotesScreen from "./components/NotesScreen";
import FocusScreen from "./components/FocusScreen";
import TaskScreen from "./components/TaskScreen";


function App() {
  //const screen = ["Habit Tracker", "Notes", "Focus Timer"];
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  return (
    <div className=" font-sans">
      {currentScreenIndex === 0 && (
        <div className=" animate-fade-in">
          <TaskScreen />
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
      </div>
    </div>
  );
}

export default App;
