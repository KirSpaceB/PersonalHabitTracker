export async function getDecodedToken() {
  const getUserId = 'http://127.0.0.1:5000/decode_user_id'

  const token = JSON.parse(sessionStorage.token)
  console.log('%c token in createUsersHabits/get.ts', 'color: red;', token)
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
  const data = await response.json();
  const stringifyData = JSON.stringify(data.decoded_user_id.user_id);
  const userId = parseInt(stringifyData);
  
  return Promise.resolve(userId);
}