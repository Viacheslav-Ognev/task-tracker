import { useState } from "react";

type ModalProps = {
  onClose: () => void;
  onAdd: (title: string, days: number) => void;
};

export default function ModalAddTask({ onClose, onAdd }: ModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [daysValue, setDaysValue] = useState(1);

  const handleSave = () => {
    if (inputValue.trim() === "") return;

    onAdd(inputValue, daysValue);
    onClose();
  };

  return (
    <div className=" fixed inset-0 z-50 bg-black/40 flex items-end justify-center backdrop-blur-sm sm:items-center p-4">
      <div className=" bg-[#F2F2F7] p-6 rounded-4xl shadow-2xl w-full max-w-md relative animate-fade-in-up">
        <button
          className=" absolute top-4 right-5 text-gray-400 hover:text-gray-800 font-bold text-xl p-2"
          onClick={() => onClose()}
        >
          ✕
        </button>

        <h2 className=" text-2xl font-bold mb-6 text-black ml-1"> New Habit</h2>

        <div className=" flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              className=" w-full rounded-2xl font-semibold outline-none p-4 placeholder-gray-400 border border-gray-300 bg-transparent shadow-sm"
            />
          </div>

          <div className=" flex border border-gray-300 p-4 rounded-2xl shadow-sm justify-between items-center">
            <span className=" text-gray-800 font-medium"> Repeat Every</span>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={daysValue}
                onChange={(e) => setDaysValue(Number(e.target.value))}
                className=" border border-gray-200 rounded-lg w-12 text-center pl-3 text-lg outline-none bg-transparent"
              />
              <span className=" font-medium text-gray-800"> Days </span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className=" bg-black text-white py-4 rounded-full hover:bg-black/90 transition-colors mt-2 shadow-md"
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
