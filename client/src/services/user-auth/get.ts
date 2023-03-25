export async function getUserHabits() {
  const token = JSON.parse(sessionStorage.token)
  console.log('%c Token in getUserHabits', 'color:red;', token)
  
  const response = await fetch("http://127.0.0.1:5000/user-auth", {
    method:"GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization':`Bearer ${JSON.stringify(token)}`
    },
    credentials:'include'
  })
  const data = await response.json()

  console.log(data)
  const habits = data.habits

  console.log('%c getUserHabits API Response', 'color:green;', habits)
  return habits
}