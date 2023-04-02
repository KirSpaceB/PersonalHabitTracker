import { postUserLogin } from "../post"

describe('postUserLogin', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  });

  it('returns null if loginInfo is empty or undefined', async () => {
    const result = await postUserLogin(undefined)
    expect(result).toBeNull()

    const result2 = await postUserLogin({})
    expect(result2).toBeNull()
  })

  it('calls fetch with the correct arguments', async() => {
    // this doesnt need to be the exact object, because the exact object is 
    // {userName:sdas, password:sdasda}
    const mockLoginInfo = { username:'testuser', password:'testpassword' }
    const mockResponse = {
      token: 'random-string-as-token-value-1234567890',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockResponse
    })

    const result = await postUserLogin(mockLoginInfo)

    expect(fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/user-auth',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': 'http://localhost:5174',        
        },
        credentials: 'include',
        body:JSON.stringify(mockLoginInfo)
      }
    )
    expect(result).toEqual(JSON.stringify(mockResponse))
  });

  it('Test for token stored in session storage', async () => {
    const mockLoginInfo = {username:'test',password:'test'}
    const mockResponse = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyfQ.Q66-3qLvTBhyI-14h1NDqkULwdcd3R7iKvAcaOL6VoU',
    };
    // Mocks the function
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    //mock session storage
    const sessionStorageMock = {
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'sessionStorage', {
      value:sessionStorageMock,
      writable: true,
    })
    await postUserLogin(mockLoginInfo);
    expect(sessionStorageMock.setItem).toHaveBeenCalled()
  })
})