import React, { useEffect } from "react";
import styles from '../styles/HabitTrackerUI.module.css';
import {useState} from "react"
import { getUserHabits } from "../services/user-auth";
import { postSendUserHabits } from "../services/createUserHabits";
import { getUserIdFromCreateUserHabits } from "../services/createUserHabits/get";
type Todo = {
  text: string,
  count: number,
}

const HabitTrackerUI = () => {
  const [input, setInput] = useState<string>('')
  // We can map habits because it is an array of objects
  const [habits, setHabits] = useState<Todo[]>([])
  console.log('Habits count', habits.length > 0 && habits[0].count !== undefined ? habits[0].count : 0);
  
  // Sends habits to the backend
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHabits([...habits,{text: input, count: 1}])
  }

  // Logic for adding 
  const handleIncrement = (index: number) => {
    const updatedHabits = [...habits];
    updatedHabits[index].count++;
    setHabits(updatedHabits);
  }

  // 'GET' Request
  const [displayHabits, setDisplayHabits] = useState([])
    useEffect(() => {
      // Gets userHabits from DB
      const gettingUserHabit = async () => {
        const awaitForGetRequest = await getUserHabits()
        console.log('%cGet Request in HabitTrackerUI', 'color:green;',awaitForGetRequest)
        setDisplayHabits(awaitForGetRequest)
      }
      gettingUserHabit()
    },[])

    useEffect(() => {
      postSendUserHabits(habits)
      getUserIdFromCreateUserHabits()
    },[handleSubmit])

  console.log('%c displayed habits useState variable','color: red;',displayHabits)
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

      {displayHabits ? 
        <ul>
          {displayHabits.map(habit => (
            <li key={habit}>{habit.user_habit} {habit.habit_count}</li>
          ))}
        </ul> : <p>Something Went Wrong</p>
      }
    </>
  )
}

export default HabitTrackerUI