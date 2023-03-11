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
      setDisplayHabits([data[0], data[1]])
    })
  },[])
  console.log(displayHabits)
  return (
    <div>
      {displayHabits.map((habit, count) => (
        // Figure out why this isn't rendering
        <div key={count}> {habit[0]} {habit[1]}</div>
      ))}
    </div>
  )
}

export default DisplayHabits