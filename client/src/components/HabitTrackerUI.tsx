import React, { useEffect } from "react";
import styles from '../styles/HabitTrackerUI.module.css';
import {useState} from "react"
import jwt_decode from "jwt-decode"
import DisplayHabits from "./DisplayHabits";
type Todo = {
  text: string,
  count: number,
}

const HabitTrackerUI = () => {

  const [input, setInput] = useState<string>('');
  // We can map habits because it is an array of objects
  const [habits, setHabits] = useState<Todo[]>([]);

  // Submit Logic: When button is clicked the text inside the input is mapped into a list
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   // Figure out how to do a get request based on the users id to match user to habit data :p
  //   const tokens = sessionStorage.getItem('token');
  //   const decodedToken = jwt_decode(tokens)
  //   const userId = decodedToken.sub;
    setHabits([...habits,{text: input, count: 1}])
  }

  // Logic for adding 
  const handleIncrement = (index: number) => {
    const updatedHabits = [...habits];
    updatedHabits[index].count++;
    setHabits(updatedHabits);
  };

  // Convert te two to objects because JSON rules
  // This gets a INTERNAL SERVER ERROR 500 but it works idk why
  useEffect(() => {
    const payload = {
      habits:habits
    }
    console.log("This is suppose to be an empty JSON", payload)
    fetch("http://127.0.0.1:5000/database", {
      method: "POST",
      headers: {
        "Content-type": "application/json", // Tell the client server that this is a json file
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload)
    })
  }, [habits])

  return(
    <>
      <form className={styles.todo_form}>

        <input 
        type="text"
        placeholder="Add a todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="text"
        className="todo_input"
        >
        </input>

        <button type="button" onClick={handleSubmit} className={styles.todo_button}>Add Habit</button>

      </form>

      <ul>
      {habits.map((habit,index) => (
        <li key={index}>
          {/* Here we are mapping the objects text and count property to their own list */}
        {habit.text} {habit.count}
        <button onClick={() => handleIncrement(index)}>Increment</button> 
        </li>
      ))}

    </ul>
    <DisplayHabits></DisplayHabits>

    </>
  )
}

export default HabitTrackerUI