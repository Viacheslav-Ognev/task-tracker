import { format } from "date-fns";
import type { Task } from "../App";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number, newTitle: string | number, newDays: number) => void;
};

export default function TaskCard({
  task,
  onDelete,
  onComplete,
  onEdit,
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
      } border p-4 mb-3 rounded-lg  shadow-sm `}
    >
      <div className="flex justify-between items-start mb-2">
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
                className=" bg-green-500 text-white px-3 py-1 rounded-sm hover:bg-green-600"
              >
                Сохранить
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex-1">
            <h2 className=" text-xl font-bold text-gray-800"> {task.title}</h2>
            <p className=" text-sm text-gray-600 mb-1">
              Повторять раз в {task.days} дн.
            </p>
          </div>
        )}

        {!isEditing && (
          <div className=" flex flex-col gap-2">
            <button
              className=" text-blue-500 hover:text-blue-700 font-bold text-right"
              onClick={() => setIsEditing(true)}
            >
              Изменить ✏️
            </button>

            <button
              className=" text-red-500 hover:text-red-700 font-bold text-right"
              onClick={() => onDelete(task.id)}
            >
              Удалить 🗑️
            </button>
          </div>
        )}
      </div>
      <div className=" bg-blue-50 p-2 mt-3 mb-4 text-sm">
        <p className=" text-blue-800 font-semibold">
          Выполнено раз: {task.count}
        </p>
        <p className=" text-blue-600 mt-1">
          {isOverdue && (
            <span className=" text-red-800 border-red-600 font-bold mb-1">
              ⚠️ Просрочено!
            </span>
          )}
          Следующее выполнение:{" "}
          {task.nextDate ? format(task.nextDate, "dd.MM.yyyy") : " Нет даты"}
        </p>
      </div>
      <button
        className=" w-full bg-green-500 text-white font-bold py-2 rounded-sm hover:bg-green-600 transition-colors"
        onClick={() => onComplete(task.id)}
      >
        Сделано! +1 ✅
      </button>
    </div>
  );
}
