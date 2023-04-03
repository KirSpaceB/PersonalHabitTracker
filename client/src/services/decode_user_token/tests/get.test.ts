import { getDecodedUserId } from "../get";

describe('get request test for decode_user_token api', () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // This doesn't do anything rn because it only works on mocks with jest.spyOn
  })
  it('calls the correct api', async () => {
    const token = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'};
    sessionStorage.setItem('token', JSON.stringify(token));

    global.fetch=jest.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ decoded_user_id: { user_id: 123 } }),
    });

    await getDecodedUserId();
    expect(global.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/decode_user_id',
      {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `Bearer ${JSON.stringify(token)}`,
        },
        credentials: 'include',
      }
    );
  });
  // Do I need to write this?
  it('should return the correct user ID on successful response', async () => {
    const decode_user_id = {user_id:2}
    global.fetch = jest.fn().mockResolvedValue({
      status:200,
      json: Promise.resolve({decoded_user_id_key:decode_user_id})
    });
  });
})