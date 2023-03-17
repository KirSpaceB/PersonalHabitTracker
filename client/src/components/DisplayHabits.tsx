import React, { useEffect, useState } from 'react'
import fetchCookie from 'fetch-cookie'
type displayedHabits = {
  text: string,
  count:number
}
const fetchCookieDecorator = fetchCookie(fetch)
// This is a helper component because we could not use two fetch calls in the same component to one backend server
const DisplayHabits = () => {
  const [displayHabits, setDisplayHabits] = useState<displayedHabits[]>([])

  useEffect(() => {
    fetchCookieDecorator("http://127.0.0.1:5000/user-auth", {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Credentials': 'http://localhost:5174',
      },
      credentials:'include',
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log('inside the 3rd .then() method on the fetch request')
      console.log(data)
      console.log(data.message)
      // data is a an array of arrays
      // How can I get data to be dynamic and also match with users so user_id = 1 would match with user_habit_id = 1
      // This needs data in order to render on the page
      // setDisplayHabits([data[0]])
    })
  },[])
  console.log(displayHabits)
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