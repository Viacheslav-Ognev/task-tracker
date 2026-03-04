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
    <div className=" fixed inset-0 z-50 bg-black\50 flex items-center justify-center backdrop-blur-sm">
      <div className=" bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          className=" absolute top-3 right-4 text-gray-400 hover:text-gray-800 font-bold"
          onClick={() => onClose()}
        >
          ✕
        </button>

        <h2 className=" text-2xl font-bold mb-4">Новая задача</h2>

        <div className=" flex flex-col gap-3">
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
            onClick={handleSave}
            className=" bg-blue-500 text-white px-4 py-2 rounded-xs hover:bg-blue-600"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
