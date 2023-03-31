import { postUserLogin } from "../post"
global.fetch = jest.fn()

describe('postUserLogin', () => {
  it('returns null if loginInfo is empty or undefined', async () => {
    const result = await postUserLogin(undefined)
    expect(result).toBeNull()

    const result2 = await postUserLogin({})
    expect(result2).toBeNull()
  })
})