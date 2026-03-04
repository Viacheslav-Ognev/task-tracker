import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import ModalAddTask from "./components/ModalAddTask";
import { addDays } from "date-fns";

// обьявляем типы для массива
export type Task = {
  id: number;
  title: string | number;
  days: number;
  isDone: boolean;
  nextDate: number;
  count: number;
};

function App() {

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
    newTitle: string | number,
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

  return (
    <div className=" pb-5 font-sans max-w-xl mx-auto">
      <h1 className=" text-4xl text-blue-600 font-bold mb-8 text-center">
        Трекер Задач 🎯
      </h1>

      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onComplete={handleCompleteTask}
            onEdit={handleEditeTask}
          />
        ))}
      </div>

      <div className=" flex justify-center mb-8">
        <button onClick={() => setIsModalOpen(true)}
        className=" bg-blue-600 text-white font-bold py-2 px-20 rounded-full shadow-lg hover:scale-105 transition-transform"
        >  
          + Add
        </button>
      </div>

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
