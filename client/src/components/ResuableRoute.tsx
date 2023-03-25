import { useNavigate } from 'react-router-dom'
import { RoutesTypeCheck } from '../utils/types'

const ResuableRoute:React.FC<RoutesTypeCheck> = ({route}) => {
  // Implement the Facade Pattern
  // Facade would be the entire library not just parts of the library. So in this case we would have to facade the Route, and Routes
  // Remember Facade is useful for things that you dont want to write
  const navigationHook = useNavigate()
  const handleNavigation = (route:string) => {
    return navigationHook(route)
  }
  const goToPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    handleNavigation(route)
  }

  return (
    <div>
        <button onClick={goToPage}>Sign Up</button>
    </div>
  )
}

export default ResuableRoute