import React, { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [newItem, setNewItem] = useState("");
  const [toDos, setToDos] = useState(() => {
    const localValue = localStorage.getItem("Items");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(toDos));
  }, [toDos]);

  function handleSubmit(e) {
    e.preventDefault();

    setToDos((prevTodos) => {
      return [
        ...prevTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }
  function toggleTodo(id, completed) {
    setToDos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setToDos((curT) => {
      return curT.filter((todo) => todo.id !== id);
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Insérer une note</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          ></input>
        </div>
        <button className="btn">Ajouter</button>
      </form>
      <h1 className="header">Mes notes</h1>
      <ul className="list">
        {toDos.length === 0 && <p>Aucune note</p>}
        {toDos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>📝​ {todo.title}</label>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Supprimer
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
