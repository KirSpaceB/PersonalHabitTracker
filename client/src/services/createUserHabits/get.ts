const getUserId = 'http://127.0.0.1:5000/createUserHabits'

export async function getUserIdFromCreateUserHabits() {
  const token = JSON.parse(sessionStorage.token)
  console.log('%c token in createUsersHabits/get.ts', 'color: green;', token)
  console.log('%c Function in getUserIdFromCreateUserHabits', 'color: green;')
  const response = await fetch(getUserId, {
    method:"GET",
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin':'http://localhost:5173',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization':`Bearer ${JSON.stringify(token)}`
    },
    credentials:'include'
  })
  const data = await response.json()
  console.log('%c response in createUsersHabits/get.ts', 'color: green;', data)
}