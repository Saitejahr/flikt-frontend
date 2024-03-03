import { Link } from 'react-router-dom'

export default function Headers() {
  return (
    <div className="header">
      <h3>User App</h3>
      <ul>
        <Link to={'/'}>
          <li>Register</li>
        </Link>
        <Link to={'/login'}>
          <li>Login</li>
        </Link>
      </ul>
    </div>
  )
}
