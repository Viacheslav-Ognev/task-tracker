import { useState, useEffect } from "react";
import ModalAddTask from "./ModalAddTask";
import { addDays } from "date-fns";
import TaskCard from "./TaskCard";

// обьявляем типы для массива
export type Task = {
  id: number;
  title: string;
  days: number;
  isDone: boolean;
  nextDate: number;
  count: number;
};

export default function TaskScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tracker_tasks");
    if (savedTasks) return JSON.parse(savedTasks);
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
    <div className=" min-h-screen bg-[#F2F2F7] pt-12 px-5 pb-32">
      <h1 className=" text-3xl font-bold text-black mb-12 tracking-tight w-full text-left">
        Habit Tracker
      </h1>

      <div className=" flex flex-col gap-1">
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
      <div className=" flex justify-center mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className=" bg-black text-white  px-12 w-full font-semibold py-4 rounded-3xl shadow-sm hover:bg-black/90 hover:scale-102 transition-transform"
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
