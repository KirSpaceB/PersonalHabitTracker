import React, { useEffect, useState } from 'react'
type displayedHabits = {
  text: string,
  count:number
}

// This is a helper component because we could not use two fetch calls in the same component to one backend server
const DisplayHabits = () => {
  const [displayHabits, setDisplayHabits] = useState<displayedHabits[]>([])

  useEffect(() => {
       fetch('http://127.0.0.1:5000/sendUserData', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)
      // data is a an array of arrays
      // How can I get data to be dynamic and also match with users so user_id = 1 would match with user_habit_id = 1
      // This needs data in order to render on the page
      setDisplayHabits([data[0]])
    })
    // We need to create a conditional that matches users
  },[])
  console.log(displayHabits)
  return (
    <div>
      {displayHabits.map((habit, count) => (
        // 
        <div key={count}> {habit[0]} {habit[1]}</div>
      ))}
    </div>
  )
}

export default DisplayHabits