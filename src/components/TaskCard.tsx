import { format } from "date-fns";
import type { Task } from "./TaskScreen";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newDays: number) => void;
  onReset: (id: number) => void;
};

export default function TaskCard({
  task,
  onDelete,
  onComplete,
  onEdit,
  onReset,
}: TaskCardProps) {
  const isOverdue = Date.now() > task.nextDate;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDays, setEditDays] = useState(task.days);

  const handleSave = () => {
    onEdit(task.id, String(editTitle), Number(editDays));

    setIsEditing(false);
  };

  return (
    // общий контейнер
    <div
      className={` p-5 mb-4 rounded-3xl shadow-sm
       ${isOverdue ? "bg-red-50 " : "bg-white "}`}
    >
      <div className="flex justify-between items-start mb-3">
        {isEditing ? (
          <div className=" flex flex-col gap-2 w-full mr-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className=" w-full font-bold text-lg outline-none border-b border-gray-200 bg-transparent pb-1"
            />

            <div className=" flex gap-2 mt-2">
              <input
                type="number"
                min="1"
                value={editDays}
                onChange={(e) => setEditDays(Number(e.target.value))}
                className=" w-20 outline-none border-b border-gray-200 bg-transparent pb-1"
              />
              <button
                onClick={handleSave}
                className=" bg-black text-white text-sm font-bold py-2 px-4 rounded-xl hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex-1">
            <h2 className=" font-semibold text-xl text-gray-900 leading-snug">
              {task.title}
            </h2>
            <p className=" text-sm text-gray-500 mt-1">
              Repeat every {task.days} day.
            </p>
          </div>
        )}

        {!isEditing && (
          <div className=" flex flex-col items-center">
            <button
              className=" hover:scale-105 ml-2 p-1 text-xl"
              onClick={() => setIsEditing(true)}
            >
              ✏️
            </button>

            <button
              className=" hover:scale-105 ml-2 p-1 text-xl"
              onClick={() => onDelete(task.id)}
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <div className=" bg-[#F2F2F7] p-2 mt-4 mb-4 rounded-2xl text-sm flex justify-between items-center">
        <div>
          <p className=" text-gray-800 mb-1 font-semibold">
            Completed: {task.count}
            {task.count > 0 && (
              <button
                onClick={() => onReset(task.id)}
                className=" ml-3 text-xs text-gray-400 hover:text-red-500 underline"
              >
                Reset Count
              </button>
            )}
          </p>
          <p className=" text-gray-600">
            {isOverdue && (
              <span className=" text-red-500 font-bold mr-2"> Overdue! </span>
            )}
            Next execution:
            <span className=" font-medium text-black">
              {task.nextDate
                ? format(task.nextDate, "dd.MM.yyyy")
                : " Нет даты"}
            </span>
          </p>
        </div>
      </div>

      <div className=" flex justify-center">
        <button
          className=" w-5/6 bg-black text-white font-bold py-3.5 rounded-full shadow-sm hover:scale-102 hover:bg-black/90 transition-transform"
          onClick={() => onComplete(task.id)}
        >
          Done!
        </button>
      </div>
    </div>
  );
}
