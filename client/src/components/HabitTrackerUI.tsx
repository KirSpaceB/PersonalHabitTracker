import React, { useEffect } from "react";
import styles from '../styles/HabitTrackerUI.module.css';
import {useState} from "react"
import { getUserHabits } from "../services/user-auth";
import { postSendUserHabits } from "../services/createUserHabits";
import { getDecodedUserId } from "../services/decode_user_token/get";
import { deleteUserHabitAPI } from "../services/delete_user_habit/delete";
type Todo = {
  text: string,
  count: number,
}

const HabitTrackerUI = () => {
  const [input, setInput] = useState<string>('')
  // We can map habits because it is an array of objects
  const [habits, setHabits] = useState<Todo[]>([])
  // console.log('Habits count', habits.length > 0 && habits[0].count !== undefined ? habits[0].count : 0);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Check if the habit already exists, if yes, return without adding a duplicate
    if (habits.find((habit) => habit.text === input)) {
      console.log('%c Habits in side the habits.find statement', 'color:red;', habits)
      return;
    }
    const newHabit = { text: input, count: 1 };

    console.log("🚀 ~ file: HabitTrackerUI.tsx:27 ~ handleSubmit ~ newHabit:", newHabit)
    // Habits takes input as one of the values which is another state 
    const updatedHabits = [...habits, { text: input, count: 1 }];

    setHabits(updatedHabits);

    const decodedTokenUserId = await getDecodedUserId();

    if (!decodedTokenUserId) {
      console.log('THERES A TOKEN MISSING IN HANDLESUBMIT AT HABITTRACKERUI')
    }
    console.log("🚀 ~ file: HabitTrackerUI.tsx:41 ~ handleSubmit ~ decodedTokenUserId:", decodedTokenUserId)
    
    postSendUserHabits(newHabit, decodedTokenUserId);
  };

  

  // Logic for adding 
  const handleIncrement = (index: number) => {
    const updatedHabits = [...habits];
    console.log('%c updatedHabits in handleIncrement', 'color:red;', updatedHabits);

    updatedHabits[index].count++;
    setHabits(updatedHabits);
  }

  const handleDeleteUIHabit = (index) => {
    const updatedHabits = [...displayHabits];
    updatedHabits.splice(index, 1)
    setDisplayHabits(updatedHabits)
  };

  const handleDeleteFetchedHabit = async (habitToDelete) => {
    const updatedHabits = displayHabits.filter(habit => habit !== habitToDelete);
    const userIdSentToDeleteUserHabitAPI = await getDecodedUserId();
    setDisplayHabits(updatedHabits)

    const valuesSentToDeleteUserHabitAPI = 
    {
      user_id:userIdSentToDeleteUserHabitAPI,
      habitGoingToBeDelete:habitToDelete
    }
    console.log('%c valuesSentToDeleteUserHabitAPI', 'color:red;', valuesSentToDeleteUserHabitAPI);
    deleteUserHabitAPI(valuesSentToDeleteUserHabitAPI)
  };

  // 'GET' Request to render habits
  const [displayHabits, setDisplayHabits] = useState([])

    useEffect(() => {
      // Gets userHabits from DB
      const gettingUserHabit = async () => {
        const awaitForGetRequest = await getUserHabits()
        setDisplayHabits(awaitForGetRequest)
      }
      gettingUserHabit()
    },[])

  console.log('%c displayed habits useState variable','color: red;',displayHabits)
  return (
    <>
      <form className={styles.todo_form}>
        <input
          type="text"
          placeholder="Add a habit"
          value={(input)}
          onChange={(e) => setInput(e.target.value)}
          name="text"
          className="todo_input"
        ></input>
        <button type="button" onClick={handleSubmit} className={styles.todo_button}>
          Add Habit
        </button>
      </form>

      {/* Rendering UI-only habits */}
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>
            {habit.text} {habit.count}
            <button onClick={() => handleIncrement(index)}>Increment</button>
            <button onClick={() => handleDeleteUIHabit(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Rendering fetched habits */}
      {displayHabits ? (
        <ul>
          {displayHabits.map((habit, index) => (
            <li key={index}>
              {habit.user_habit} {habit.habit_count}
              <button onClick={() => handleDeleteFetchedHabit(habit)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Something Went Wrong</p>
      )}
    </>
  )
}

export default HabitTrackerUI