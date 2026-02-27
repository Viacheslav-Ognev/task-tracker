import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";

// обьявляем типы для массива
type Task = {
  id: number;
  title: string | number;
  days: number;
  isDone: boolean;
};

function App() {
  //определение типов в массиве

  // главный масив
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tracker_tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  // массив для инпута
  const [inputValue, setInputValue] = useState("");
  const [daysValue, setDaysValue] = useState(1);

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
  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: inputValue,
      days: daysValue,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    // очищаем поле инпут
    setInputValue("");
    setDaysValue(1);
  };

  // функция смены задачи сделанна\не сделанна
  const handleToggleStatus = (idToToggle: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToToggle) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className=" pb-5 font-sans max-w-xl mx-auto">
      <h1 className=" text-4xl text-blue-600 font-bold mb-8 text-center"> Трекер Задач 🎯 </h1>

      <div className=" flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Что нужно сделать?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=" border border-gray-300 rounded-xs px-3 w-full"
        />
        <input 
        type="number"
        min="1"
        value={daysValue}
        onChange={(e) => setDaysValue(Number(e.target.value))}
        className=" border border-gray-300 rounded-xs px-3 w-20"
         />
        <button 
        onClick={handleAddTask} 
        className=" bg-blue-500 text-white px-4 py-2 rounded-xs hover:bg-blue-600"
        >
          Добавить
        </button>
      </div>

      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggleStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
