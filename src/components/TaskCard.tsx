import { format } from "date-fns";
import type { Task } from "./TaskScreen";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newMode: "interval" | "weekdays", newDays: number, newSelectDays: number[], ) => void;
  onReset: (id: number) => void;
};

const WEEKDAYS =[
  {id: 1, label:'Mo'},{id: 2, label:'Tu'},
  {id: 3, label:'We'},{id: 4, label:'Th'},
  {id: 5, label:'Fr'},{id: 6, label:'Sa'},{id: 0, label:'Su'}
];

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
  const [editMode, setEditMode] = useState<'interval' | 'weekdays'>(task.mode || 'interval');
  const [editSelectDays, setEditSelectDays] = useState<number[]>(task.selectedDays || []);

  const handleSave = () => {
    if ( editMode === 'weekdays' && editSelectDays.length === 0) {
      alert("Please select at least one day!");
      return
    }
    onEdit(task.id, String(editTitle), editMode, Number(editDays), editSelectDays);
    setIsEditing(false);
  };

  const toggleEditDay = (id:number) => {
    if (editSelectDays.includes(id)) {
      setEditSelectDays(editSelectDays.filter(dayId => dayId !== id));
    } else {
      setEditSelectDays([...editSelectDays, id])
    }
  }

  const formatSelectDays = (daysArray: number[]) => {
    if (!daysArray || daysArray.length === 0) return "No days selected";

    return daysArray.map(dayId => WEEKDAYS.find(w => w.id === dayId)?.label).join(', ');
  }
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

            <div className=" relative flex bg-gray-100 p-1 rounded-xl">
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-sm transition-transform duration-300 ease-in-out
                    ${editMode === 'weekdays' ? 'translate-x-full' : 'translate-x-0'}`}
                />

                <button
                onClick={() => setEditMode('interval')}
                className={` relative flex-1 py-2 text-sm font-bold transition-colors cursor-pointer z-10 duration-300 outline-none
                          ${editMode === 'interval' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Interval
                </button>

                <button
                onClick={() => setEditMode('weekdays')}
                className={` relative flex-1 py-2 text-sm font-bold transition-colors cursor-pointer z-10 duration-300 outline-none
                          ${editMode === 'weekdays' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Specific Days
                </button>
            </div>

            {editMode === 'interval' ? (
              <div className=" flex items-center gap-2">
                <span className=" text-sm text-gray-800 font-medium">Every</span>
                <input 
                  type="number"
                  placeholder='1'
                  onChange={(e) => setEditDays(Number(e.target.value))}
                  className=" w-11 text-center font-bold outline-none border-b border-gray-200 bg-transparent pb-1" 
                />
                <span className=" text-sm text-gray-800 font-medium"> days</span>
              </div>
            ) : (
              <div className=" flex justify-between gap-1">
                {WEEKDAYS.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => toggleEditDay(day.id)}
                    className= {` w-7.5 h-7.5 rounded-full font-bold text-10px transition-colors 
                                ${editSelectDays.includes(day.id) ? 'bg-black/60 text-white shadow-sm ' : 'bg-gray-100 text-gray-500'
                                }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            )}

            <div className=" flex gap-2 mt-1">
              <button
                onClick={handleSave}
                className=" cursor-pointer flex-1 bg-black text-white text-sm font-bold py-2 rounded-xl hover:bg-black/90"
              >
                Save
              </button>

              <button 
                onClick={() => setIsEditing(false)}
                className=" cursor-pointer flex-1 bg-gray-100 text-gray-600 text-sm font-bold py-2 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex-1">
            <h2 className=" font-semibold text-xl text-gray-900 leading-snug">
              {task.title}
            </h2>
            <p className=" text-sm text-gray-500 mt-1">
              {task.mode === 'weekdays' 
              ? `On ${formatSelectDays(task.selectedDays)}` : `Repeat every ${task.days} days`}
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
