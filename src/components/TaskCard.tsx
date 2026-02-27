// задаем типы данных
export type Task = {
  id: number;
  title: string | number;
  days: number;
  isDone: boolean;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
  return (
    <div className={` border px-2.5 py-2.5 mb-2.5 rounded-xl border-gray-300 ${task.isDone ? 'bg-green-100' : 'bg-white'}`}>
      <h2> {task.title} </h2>
      <p> Повторять раз в {task.days} день\дня\дней </p>
      <p>
        Статус: <b>{task.isDone ? "Выполнено ✅" : "В процессе ⏳"}</b>
      </p>
      <button className="pr-2" onClick={() => onDelete(task.id)}> Удалить </button>
      <button className="px-2" onClick={() => onToggle(task.id)}> Изменить статус 🔄 </button>
    </div>
  );
}
