import React, { useEffect, useState } from 'react'

// This is a helper component because we could not use two fetch calls in the same component to one backend server
const DisplayHabits = () => {
  const [displayHabits, setDisplayHabits] = useState([])

  const token = JSON.parse(sessionStorage.token)
  console.log(token)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/user-auth", {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization':`Bearer ${JSON.stringify(token)}`
      },
      credentials:'include',
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log('line 23 fetched data', data)
      const habits = data.habits
      console.log('line 25 habits', habits) // This is an array??
      console.log('line 26 typeof habits', typeof habits)// This is an object??
      setDisplayHabits(habits)
    })
  },[])
  
  console.log('line 30 displayed habits useState variable',displayHabits)

  return (
    <div>
      {displayHabits.length > 0 ? (
        <ul>
          {displayHabits.map(habit => (
            <li key={habit}>{habit.user_habit} {habit.habit_count}</li>
          ))}
        </ul>
      ) : <p>Loading habits</p> 
      }
    </div>
  )
}

export default DisplayHabits