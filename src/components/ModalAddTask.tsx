import { useState } from "react";

type ModalProps = {
  onClose: () => void;
  onAdd: (title: string, mode: 'interval' | 'weekdays', daysInterval: number, selectedDays: number[]) => void;
};

const WEEKDAYS =[
  {id: 1, label:'Mo'},{id: 2, label:'Tu'},
  {id: 3, label:'We'},{id: 4, label:'Th'},
  {id: 5, label:'Fr'},{id: 6, label:'Sa'},{id: 7, label:'Su'}
];

export default function ModalAddTask({ onClose, onAdd }: ModalProps) {
  const [inputValue, setInputValue] = useState("");


  const [daysValue, setDaysValue] = useState(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [mode, setMode] = useState<'interval' | 'weekdays'>('interval');

  const toggleDays = (id:number) => {
    if(selectedDays.includes(id)) {
      setSelectedDays(selectedDays.filter(daysId => daysId !== id));
    } else {
      setSelectedDays([...selectedDays, id]);
    }
  }

  const handleSave = () => {
    if (inputValue.trim() === "") return;

    if (mode === 'weekdays' && selectedDays.length === 0){
      return
    }

    onAdd(inputValue, mode, daysValue, selectedDays);
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

          <div className=" bg-white p-4 rounded-3xl shadow-sm ">
              <div className="relative flex bg-gray-100 p-1 rounded-2xl mb-4 ">
                
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-sm transition-transform duration-300 ease-in-out
                    ${mode === 'weekdays' ? 'translate-x-full' : 'translate-x-0'}`}
                />

                <button
                onClick={() => setMode('interval')}
                className={` relative flex-1 py-2 text-sm font-bold transition-colors cursor-pointer z-10 duration-300 outline-none
                          ${mode === 'interval' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Interval
                </button>

                <button
                onClick={() => setMode('weekdays')}
                className={` relative flex-1 py-2 text-sm font-bold transition-colors cursor-pointer z-10 duration-300 outline-none
                          ${mode === 'weekdays' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Specific Days
                </button>

              </div>
          </div>

          {mode === 'interval' ? (
            <div className=" flex border border-gray-300 p-3 rounded-2xl shadow-sm justify-between items-center">
              <span className=" text-gray-800 font-medium"> Repeat Every</span>
                <div className=" flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="1"
                    min="1"
                    onChange={(e) => setDaysValue(Number(e.target.value))}
                    className=" border border-gray-200 rounded-lg w-12 text-center pl-3 text-lg outline-none bg-transparent"
                  />
                  <span className=" font-medium text-gray-800"> Days </span>
                </div>
            </div>

          ) : (
            <div className=" flex justify-between gap-1 py-2">
              {WEEKDAYS.map((day) => (
                <button
                key={day.id}
                onClick={() => toggleDays(day.id)}
                className={` w-10 h-10 rounded-full font-bold text-sm transition-colors cursor-pointer
                          ${selectedDays.includes(day.id) ? 'bg-black/60 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          )}

          

          <button
            onClick={handleSave}
            className=" bg-black text-white py-4 rounded-full hover:bg-black/90 transition-colors mt-2 shadow-md cursor-pointer"
          >
            Add Habit
          </button>
          
        </div>
      </div>
    </div>
  );
}
