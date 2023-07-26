import './Login.css';
import logo from '../../image/Colorful Infinite Logo Design (500 × 400 px).png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async (ev) => {
    ev.preventDefault();

    try {
      const response = await fetch("/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        // Redirect to /dashboard on success
        sessionStorage.setItem(
          "loggedin",
          JSON.stringify({
            data: {
              username: username
            },
          })
        );
        // navigate("/dashboard");
        window.location = "/dashboard";
      } else {
        // Handle authentication failure
        const errorData = await response.json();
        // Display the error message
        console.log(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <img src={logo} alt="logo" className="logo-image" />
        <form className="form-login" onSubmit={register}>
          <input
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            className='user-input'
            type="text"
            placeholder="username"
          />
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className='password-input'
            type="password"
            placeholder="create password"
          />
          <button type="submit" className="register-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;