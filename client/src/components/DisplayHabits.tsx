import React, { useEffect, useState } from 'react'
import fetchCookie from 'fetch-cookie'
type displayedHabits = {
  text: string,
  count:number
}

// This is a helper component because we could not use two fetch calls in the same component to one backend server
const DisplayHabits = () => {
  const [displayHabits, setDisplayHabits] = useState<displayedHabits[]>([])

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
      // data is not hit yet
    })
  },[])

  return (
    <div>
      {/* {displayHabits.map((habit, count) => (
        // 
        <div key={count}> {habit[0]} {habit[1]}</div>
      ))} */}
      Test
    </div>
  )
}

export default DisplayHabits