import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Помыть лоток коту", days: 2 },
    { id: 2, title: "Выучить React", days: 1 },
  ]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{textAlign: "center"}}> Трекер Задач 🎯 </h1>

      <div>
        {tasks.map((task) => {
          return (
            <div
              key={tasks.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h2 > {task.title}</h2>
              <p> Повторять раз в {task.days} дня</p>
              <button> Удалить </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
