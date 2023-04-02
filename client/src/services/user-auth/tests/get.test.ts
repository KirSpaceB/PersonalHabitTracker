import { getUserHabits } from "../get";
type habitsFromBackendInterface = {
  habit_count:number
  habit_name:string
}

describe('getUserHabits()', () => {
  
  beforeEach(() => {   
    global.fetch = jest.fn() 
    sessionStorage.clear()
  });

  it('Gets habit from backend', async () => {
    //Mock the fetch function
    const postSendUserHabitsArguments:habitsFromBackendInterface = {
      habit_count:1,
      habit_name:'running'
    }

    const tryHabitsFromTheBackendArray = [postSendUserHabitsArguments];

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => {
        return tryHabitsFromTheBackendArray
      },
    })
    // We need to mock the get request
    expect(global.fetch).toHaveBeenCalledTimes(1)
    // I think we need to fix objectContaining
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/user-auth",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `Bearer ${JSON.stringify(sessionStorage)}`
        }),
        credentials: 'include'
      })
    )
  })
})