// We make this into a function, that takes one argument, which is going to be whatever is in the HabitTrackerUI
export async function postSendUserHabits(habits:any) {
  if (habits.length > 0) {
    const payload = {
      habits:habits
    }
    console.log("%c Payload sent to backend", "color: purple;", payload)

    fetch("http://127.0.0.1:5000/createUserHabits", {
      method: "POST",
      headers: {
        "Content-type": "application/json", // Tell the client server that this is a json file
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload)
    })
  }
}
