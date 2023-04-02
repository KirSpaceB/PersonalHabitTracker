interface postSendUserHabitsArgumentsInterface {
  text:string
  count:number
}
import { postSendUserHabits } from "../post"

describe('test for post request in createUserHabits', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  });

  it('test fails if postUserHabits arguments are undefined', async () => {
    const argumentOne = {text: 'tstas', count:1};
    const argumentTwo = 1;


    global.fetch = jest.fn().mockResolvedValue({
      stats:200,
      json:() => Promise.resolve({'Message':'Successfully Executed Line 33'})
    });
    // Call the function with the arguments
    await postSendUserHabits(argumentOne,argumentTwo);
    
    const payload = {
      habits:[
        {
          "text":argumentOne.text,
          "count":argumentOne.count
        }
      ],
      user_id:argumentTwo
    };

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/createUserHabits",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173",
          "Access-Control-Allow-Credentials": "http://localhost:5174"
        },
        body: JSON.stringify(payload),
        credentials: "include"
      }
    );
  });
})