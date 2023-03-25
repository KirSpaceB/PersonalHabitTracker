import React from 'react'
import {render,fireEvent,waitFor} from '@testing-library/react'
import LoginPage from '../LoginPage'

describe('<LoginPage/>', () => {
  test('Display the loginpage component', async () => {
    const checkToRender = render(<LoginPage/>)
    expect(checkToRender)
  })
})