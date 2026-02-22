import { useState } from "react";

function App() {
  //определение типов в массиве
  interface tasks {
    id: number;
    title: string | number;
    days: number;
    isDone: boolean;
  }

  // главный масив
  const [tasks, setTasks] = useState([
    {
      id: tasks.length + 1,
      title: "Помыть лоток коту",
      days: 2,
      isDone: false,
    },
    { id: tasks.length + 1, title: "Выучить React", days: 1, isDone: false },
  ]);
  // массив для инпута
  const [inputValue, setInputValue] = useState("");

  // функция удаления
  const handleDelete = (idToRemove: number) => {
    const actualTasks = tasks.filter((task) => task.id !== idToRemove);
    setTasks(actualTasks);
  };

  // функция добавления задания
  /*
const addTasks = ((titleAdd:string) => {
  const newTask = tasks.push(titleAdd);
  setTasks(newTask);
});
*/
  const handleAddTask = () => {
    if (inputValue.trim() === "") return;
  };

  const newTask = {
    id: Date.now(),
    title: inputValue,
    days: 1,
    isDone: false,
  };

  setTasks([...tasks, newTask]);
  // очищаем поле инпут
  setInputValue("");

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
              key={tasks.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h2> {task.title}</h2>
              <p> Повторять раз в {task.days} дня</p>
              <button onClick={() => handleDelete(task.id)}>Удалить</button>
              <p> {task.isDone} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
