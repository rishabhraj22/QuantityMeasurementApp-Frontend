import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import '../../styles/Auth.css'

function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()

    if (!fullName || !email || !password || !mobile) {
      alert('Please fill all fields')
      return
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || []

    const userAlreadyExists = existingUsers.find((user) => user.email === email)

    if (userAlreadyExists) {
      alert('User already exists with this email')
      return
    }

    const newUser = {
      fullName,
      email,
      password,
      mobile,
    }

    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))

    alert('Signup successful! Please login.')
    navigate('/login')
  }

  return (
    <AuthLayout>
      <div className="auth-tabs">
        <Link to="/login" className="tab-link">
          LOGIN
        </Link>
        <div className="tab-active">SIGNUP</div>
      </div>

      <form className="auth-form" onSubmit={handleSignup}>
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

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

        <label>Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button type="submit" className="auth-btn">
          Signup
        </button>
      </form>
    </AuthLayout>
  )
}

export default Signup