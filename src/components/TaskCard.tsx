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
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
        backgroundColor: task.isDone ? "#e6ffe6" : "white",
      }}
    >
      <h2> {task.title} </h2>
      <p> Повторять раз в {task.days} дня </p>
      <p>
        Статус: <b>{task.isDone ? "Выполнено ✅" : "В процессе ⏳"}</b>
      </p>
      <button onClick={() => onDelete(task.id)}> Удалить </button>
      <button onClick={() => onToggle(task.id)}> Изменить статус 🔄 </button>
    </div>
  );
}
