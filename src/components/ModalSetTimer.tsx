import { useState } from "react";


export type ModalTimerProps = { 
    onClose: () => void;
    onSave: (h:number, m:number, s:number) => void;

    currentH: number;
    currentM: number;
    currentS: number;
};


export default function ModalSetTimer({onClose, onSave, currentH, currentM, currentS}: ModalTimerProps) {

    const[inputH, setInputH] = useState(currentH);
    const[inputM, setInputM] = useState(currentM);
    const[inputS, setInputS] = useState(currentS);

    const handleApply = () => {

        const totalSecond = (Number(inputH)*3600) + (Number(inputM)*60) + (Number(inputS))

        const finalH = Math.floor(totalSecond / 3600);
        const finalM = Math.floor((totalSecond % 3600) / 60);
        const finalS = totalSecond % 60;

        onSave(finalH, finalM, finalS);
    };

    return (
        <div className=" fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center backdrop-blur-sm p-4">

            <div className=" bg-[#F2F2F7] p-6 rounded-4xl shadow-2xl w-full max-w-sm relative animate-fade-in">
                <button 
                onClick={onClose}
                className=" absolute top-4 right-5 text-gray-400 hover:text-gray-800 font-bold text-xl p-2"
                >
                    ✕
                </button>

                <h2 className=" text-2xl font-bold mb-6 text-black text-center">
                Set Timer
                </h2>

                <div className=" flex justify-center gap-4 mb-8">

                    <div className=" flex flex-col items-center">
                        <input 
                        type="number"
                        placeholder="0"
                        min="0"
                        max="24"
                        onChange={(e) => setInputH(Number(e.target.value))}
                        className="  w-16 h-16 text-center text-2xl font-bold bg-white rounded-2xl shadow-sm outline-none"
                        />
                        <span className=" text-xs text-gray-500 mt-2 font-medium"> HOURS</span>
                    </div>

                    <span className=" text-3xl font-bold text-gray-400 mt-3"> : </span>

                    <div className=" flex flex-col items-center">
                        <input 
                        type="number"
                        placeholder="0"
                        min="0"
                        max="59"
                        onChange={(e) => setInputM(Number(e.target.value))}
                        className="  w-16 h-16 text-center text-2xl font-bold bg-white rounded-2xl shadow-sm outline-none"
                        />
                        <span className=" text-xs text-gray-500 mt-2 font-medium"> MINS </span>
                    </div>

                    <span className=" text-3xl font-bold text-gray-400 mt-3"> : </span>

                    <div className=" flex flex-col items-center">
                        <input 
                        type="number"
                        placeholder="0"
                        min="0"
                        max="59"
                        onChange={(e) => setInputS(Number(e.target.value))}
                        className="  w-16 h-16 text-center text-2xl font-bold bg-white rounded-2xl shadow-sm outline-none"
                        />
                        <span className=" text-xs text-gray-500 mt-2 font-medium"> SECS </span>
                    </div>

                </div>

                <button 
                onClick={handleApply}
                className=" w-full bg-black text-white font-bold py-4 rounded-full shadow-sm hover:bg-gray-800 transition-colors"
                >
                    Start Focus
                </button>

            </div>

        </div>
    )
}