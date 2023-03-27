export async function getUserHabits() {
  const token = JSON.parse(sessionStorage.token)
  if(!token) {
    console.log('%c NO TOKEN in getUserHabits', 'color:red;')

  }
  
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

  if (!data) {
    console.log('NO REPONSE DATA IN uset-auth/get-ts')
  }
  const habits = data.habits

  return habits
}