import { format, subDays, addDays, getDay} from "date-fns"

type ActivityScreenProps = { 
    activityLog: Record<string, number>;
};


export default function ActivityScreen({activityLog}: ActivityScreenProps) {
  
    const today = new Date();
    const daysUnitilSaturday = 6 - getDay(today);
    const endOfWeek = addDays(today, daysUnitilSaturday);

    const last35Days = Array.from({length: 35}).map((_, index) => {
        const date = subDays(endOfWeek, 34 - index);
        return format(date, "yyyy-MM-dd");
    });

    const getColorClass = (count:number) => { 
        if(count === 0) return "bg-gray-100";
        if(count === 1) return "bg-gray-300";
        if(count === 2) return "bg-gray-500";
        return "bg-gray-800 shadow-sm border-gray-900"
    };

    return (
        <div className=" min-h-screen bg-[#F2F2F7] pt-12 pb-32">
            <h1 className=" text-3xl font-bold text-black mb-8 tracking-tight">
                Activity
            </h1>

            <div className=" bg-white p-6 rounded-3xl shadow-sm">
                <h2 className=" text-lg font-bold text-gray-800 mb-6">
                    Habits Heatmap
                </h2>

                <div className=" grid grid-cols-7 gap-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div 
                        key={day} 
                        className=" text-center text-[10px], font-bold text-gray-400 mb-2">
                            {day}
                        </div>
                    ))}

                    {last35Days.map((dateStr) => {
                        const count = activityLog[dateStr] || 0
                        
                        return (
                            <div 
                            key={dateStr}
                            title={`${dateStr}: ${count} completed`}
                            className={` w-full aspect-square rounded-md border border-transparent ${getColorClass(count)} transition-colors duration-500`}
                            />
                        )
                    })}
                </div>

                <div className=" flex items-center justify-end gap-1.5 mt-8 text-xs text-gray-500 font-medium">
                    <span>Less</span>
                    <div className=" w-3.5 h-3.5 rounded-sm bg-gray-100"/>
                    <div className=" w-3.5 h-3.5 rounded-sm bg-gray-300"/>
                    <div className=" w-3.5 h-3.5 rounded-sm bg-gray-500"/>
                    <div className=" w-3.5 h-3.5 rounded-sm bg-gray-800"/>
                    <span>More</span>
                </div>
            </div>
        </div>

        
    )




}