// We make this into a function, that takes one argument, which is going to be whatever is in the HabitTrackerUI
export async function postSendUserHabits(habits:any,user_id:number) {
  const url = "http://127.0.0.1:5000/createUserHabits"
  const method = 'POST'
  const headers = {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": "http://localhost:5174"// Indicates that this has nothing to do with connection since its different from localhost 5173
  }
  const credentials = 'include'
  if (habits) {
    const payload = {
      habits:[
        {
          "text":habits.text,
          "count":habits.count
        }
      ],
      user_id:user_id
    }
    console.log("%c Payload in createUserHabits endpoint to send to backend", "color: purple;", payload)
  
    const response = await fetch(url, {method,headers,credentials,
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    const stringifyData = JSON.stringify(data)
    console.log("%c createUserHabits_API_Response", "color: purple;", stringifyData)
  }
}
