import '../../styles/Auth.css'
import loginImage from '../../assets/images/login-illustration.png'

function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-image-card">
          <img src={loginImage} alt="Measurement Illustration" />
          <h3>QUANTITY MEASUREMENT SYSTEM</h3>
          <p>Convert, Compare and Calculate Units Easily</p>
        </div>

        <div className="auth-form-card">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout