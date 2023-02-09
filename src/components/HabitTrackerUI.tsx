import React from "react";
import styles from '../styles/HabitTrackerUI.module.css';
import {useState} from "react"

type Todo = {
  text: string,
  count: number,
}

const HabitTrackerUI = () => {

  const [input, setInput] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // Submit Logic: When button is clicked the text inside the input is mapped into a list
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos,{text: input, count: 1},])
    console.log('HandleSubmitCall')
    setInput(" ")
  }

  // Logic for adding 
  const handleIncrement = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].count++;
    setTodos(updatedTodos);
  };


  return(
    <>
      <form className={styles.todo_form} onSubmit={handleSubmit}>

        <input 
        type="text"
        placeholder="Add a todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="text"
        className="todo_input"
        >
        </input>

        <button className={styles.todo_button}>Add Habit</button>

      </form>

      <ul>

      {todos.map((todo,index) => (
        <li key={index}>
        {todo.text} {todo.count}
        
        <button onClick={() => handleIncrement(index)}>Increment</button>
        
        </li>
      ))}
    </ul>

    </>
  )
}

export default HabitTrackerUI