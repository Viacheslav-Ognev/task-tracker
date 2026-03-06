import { format } from "date-fns";
import type { Task } from "../App";
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
      className={`${
        isOverdue ? "bg-red-50 border-red-400" : "bg-white border-gray-300"
      } border py-3 px-8 mb-3 rounded-lg  shadow-sm `}
    >
      <div className="flex justify-between items-start mb-2 rounded-lg">
        {isEditing ? (
          <div className=" flex flex-col gap-2 w-full mr-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className=" border border-gray-400 px-2 py-1 rounded-sm"
            />

            <div className=" flex gap-2">
              <input
                type="number"
                min="1"
                value={editDays}
                onChange={(e) => setEditDays(Number(e.target.value))}
                className=" border border-gray-400 px-2 py-1 rounded-sm w-20"
              />
              <button
                onClick={handleSave}
                className=" bg-black text-white px-6 py-1 rounded-lg hover:bg-black\80"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex-1">
            <h2 className=" text-xl font-bold text-gray-800"> {task.title}</h2>
            <p className=" text-sm text-gray-600 mb-1">
              Repeat every {task.days} day.
            </p>
          </div>
        )}

        {!isEditing && (
          <div className=" flex flex-col gap-2">
            <button
              className=" text-blue-800 hover:text-blue-500 font-bold text-right"
              onClick={() => setIsEditing(true)}
            >
              Change ✏️
            </button>

            <button
              className=" text-red-900 hover:text-red-500 font-bold text-right"
              onClick={() => onDelete(task.id)}
            >
              Delete 🗑️
            </button>
          </div>
        )}
      </div>
      <div className=" bg-blue-50 p-2 mt-3 mb-4 text-sm">
        <p className=" text-black font-semibold">
          Completed: {task.count}
        </p>
        {task.count > 0 &&
        <button onClick={() => onReset(task.id)}
        className=" ml-2 text-xs text-gray-400 hover:text-red-500 underline"
        >
          Reset Count
        </button>
        }
        <p className=" text-black mt-1">
          {isOverdue && (
            <span className=" text-red-800 border-red-600 font-bold mb-1">
              ⚠️ Overdue!
            </span>
          )}
            Next execution:{" "}
          {task.nextDate ? format(task.nextDate, "dd.MM.yyyy") : " Нет даты"}
        </p>
      </div>
      <button
        className=" w-full bg-black text-white font-bold py-2 rounded-lg hover:scale-105 transition-transform"
        onClick={() => onComplete(task.id)}
      >
        Done! +1 ✅
      </button>
    </div>
  );
}
