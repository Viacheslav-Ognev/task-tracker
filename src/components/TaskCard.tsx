import { format } from "date-fns";
import type { Task } from "../App";

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};

export default function TaskCard({
  task,
  onDelete,
  onComplete,
}: TaskCardProps) {
  const isOverdue = Date.now() > task.nextDate;

  return (
    // общий контейнер
    <div
      className={`${
        isOverdue ? "bg-red-50 border-red-400" : "bg-white border-gray-300"
      } border p-4 mb-3 rounded-lg  shadow-sm `}
    >
      <div className={` flex justify-between items-start mb-2`}>
        <h2 className=" text-xl font-bold text-gray-800"> {task.title} </h2>
        <button
          className=" text-red-500 hover:text-red-700 font-bold"
          onClick={() => onDelete(task.id)}
        >
          Удалить
        </button>
      </div>

      <p className=" text-sm text-gray-600 mb-1">
        Повторять раз в {task.days} дн.
      </p>

      <div className=" bg-blue-50 p-2 mt-3 mb-4 text-sm">
        <p className=" text-blue-800 font-semibold">
          Выполнено раз: {task.count}
        </p>
        <p className=" text-blue-600 mt-1">
          {isOverdue && (
            <p className=" text-red-800 border-red-600 font-bold mb-1">
              "⚠️ Просрочено!"
            </p>
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
