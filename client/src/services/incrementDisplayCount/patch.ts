export async function incrementDisplayCount
(
  userID:number, 
  habit:string,
  incrementedNumber:number
) 
{
  const payload = {
    userID:userID,
    habit:habit,
    incrementedNumber: incrementedNumber + 1
  }
  const response = await fetch('http://127.0.0.1:5000/update_display_count',
  {
    method:'PATCH',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Credentials": "http://localhost:5174"        
    },
    body:JSON.stringify(payload)
  });
  const responseData = await response.json();
  console.log("🚀 ~ file: patch.ts:25 ~ responseData:", responseData)
}