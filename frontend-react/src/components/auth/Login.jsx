import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import '../../styles/Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please fill all fields')
      return
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || []

    const validUser = existingUsers.find(
      (user) => user.email === email && user.password === password
    )

    if (!validUser) {
      alert('Invalid email or password')
      return
    }

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('currentUser', email)

    navigate('/')
    window.location.reload()
  }

  return (
    <AuthLayout>
      <div className="auth-tabs">
        <div className="tab-active">LOGIN</div>
        <Link to="/signup" className="tab-link">
          SIGNUP
        </Link>
      </div>

      <form className="auth-form" onSubmit={handleLogin}>
        <label>Email Id</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login