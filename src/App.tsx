import { useState } from "react";

type Task = {
  id: number;
  title: string | number;
  days: number;
  isDone: boolean;
};

function App() {
  //определение типов в массиве


  // главный масив
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Помыть лоток коту", days: 2, isDone: false },
    { id: 2, title: "Выучить React", days: 1, isDone: true },
  ]);

  // массив для инпута
  const [inputValue, setInputValue] = useState("");

  // функция удаления
  const handleDelete = (idToRemove: number) => {
    const actualTasks = tasks.filter((task) => task.id !== idToRemove);
    setTasks(actualTasks);
  };

  // функция добавления задания с очищением инпута 
  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

      const newTask = {
        id: Date.now(),
        title: inputValue,
        days: 1,
        isDone: false,
      };

      setTasks([...tasks, newTask]);
      // очищаем поле инпут
      setInputValue("");
  };





  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}> Трекер Задач 🎯 </h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Что нужно сделать?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "200px" }}
        />
        <button onClick={handleAddTask} style={{ padding: "8px" }}>
          Добавить
        </button>
      </div>

      <div>
        {tasks.map((task) => {
          return (
            <div
              key={task.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: task.isDone ? "#e6ffe6" : "white"
              }}
            >
              <h2> {task.title}</h2>
              <p> Повторять раз в {task.days} дня</p>
              <button onClick={() => handleDelete(task.id)}>Удалить</button>
              <p> {task.isDone ? "Выполнено ✅" : "В процессе ⏳"} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
