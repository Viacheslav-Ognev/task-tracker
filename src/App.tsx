import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import ModalAddTask from "./components/ModalAddTask";
import NotesScreen from "./components/NotesScreen";
import { addDays } from "date-fns";

// обьявляем типы для массива
export type Task = {
  id: number;
  title: string;
  days: number;
  isDone: boolean;
  nextDate: number;
  count: number;
};

function App() {
  const screen = ["Track", "Notes"];

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const handleNextScreen = () => {
    if (currentScreenIndex === screen.length - 1) {
      setCurrentScreenIndex(0);
    } else {
      setCurrentScreenIndex(currentScreenIndex + 1);
    }
  };

  const handlePrevScreen = () => {
    if (currentScreenIndex === 0) {
      setCurrentScreenIndex(screen.length - 1);
    } else {
      setCurrentScreenIndex(currentScreenIndex - 1);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // главный масив
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tracker_tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  // локальное хранилище
  useEffect(() => {
    const packedTasks = JSON.stringify(tasks);
    localStorage.setItem("tracker_tasks", packedTasks);
  }, [tasks]);

  // функция удаления
  const handleDelete = (idToRemove: number) => {
    const actualTasks = tasks.filter((task) => task.id !== idToRemove);
    setTasks(actualTasks);
  };

  // функция добавления задания с очищением инпута
  const handleAddTask = (newTitle: string, newDays: number) => {
    const newTask = {
      count: 0,
      id: Date.now(),
      title: newTitle,
      days: newDays,
      isDone: false,
      nextDate: addDays(new Date(), newDays).getTime(),
    };

    setTasks([...tasks, newTask]);
  };

  // функция смены задачи сделанна\не сделанна
  const handleCompleteTask = (idToToggle: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToToggle) {
        return {
          ...task,
          count: task.count + 1,
          nextDate: addDays(task.nextDate, Number(task.days)).getTime(),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // изменяем задачу
  const handleEditeTask = (
    idTask: number,
    newTitle: string,
    newDays: number
  ) => {
    const editTask = tasks.map((task) => {
      if (task.id === idTask) {
        return { ...task, title: newTitle, days: newDays };
      }
      return task;
    });
    setTasks(editTask);
  };

  const handleResetCount = (idToReset: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToReset) {
        return { ...task, count: 0 };
      }

      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className=" pb-5 font-sans max-w-xl mx-auto bg-black/5 rounded-2xl">
      <div className=" flex justify-between items-center my-8 shadow-sm rounded-t-2xl">
        <button
          className=" text-2xl p-2 hover:bg-gray-200 rounded-full transition-colors hover:scale-110"
          onClick={handlePrevScreen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>

        </button>
        <h1 className=" text-4xl text-gray-900 font-bold my-8 text-reght">
          {screen[currentScreenIndex]}
        </h1>
        <button
          className=" text-2xl p-2 hover:bg-gray-200 rounded-full transition-colors hover:scale-110"
          onClick={handleNextScreen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {currentScreenIndex === 0 && (
        <div className=" px-3">
          <div>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onComplete={handleCompleteTask}
                onEdit={handleEditeTask}
                onReset={handleResetCount}
              />
            ))}
          </div>
          <div className=" flex justify-center mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className=" bg-black text-white font-bold py-2.5 px-20 w-130 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              + Add
            </button>
          </div>
        </div>
      )}

      {currentScreenIndex === 1 &&(
        <NotesScreen/>
      )}


      {isModalOpen && (
        <ModalAddTask
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;
