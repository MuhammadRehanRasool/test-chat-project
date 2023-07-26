import Navbar from "../Navbar/Navbar";
import './Register.css';
import logo from '../../image/Colorful Infinite Logo Design (500 × 400 px).png'
// import RegisterButton from "./Register-button/Register-button";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



const Register = () => {
const navigate = useNavigate();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
async function register(ev) {
    ev.preventDefault();
let response = () => {
    return new Promise(function(resolve, reject){
        fetch("/user-register",{
            body:JSON.stringify({
                username: username,
                password: password,
            }), 
            method:"POST", 
            headers:{
                "Content-Type": "application/json"
            }
        }).then(data => data.json())
        .then(response => {
            resolve(response)
            navigate("/login")
        }).catch(error => {
            reject(error)
        })
    })
}
async function fetchData(){
    let responseData = await response()
console.log(responseData)
}
fetchData()
} 

    return (
        <div className="container">
            <div className="login-container">
            <img src={logo} alt="logo" className="logo-image"/>
            <form className="form-login" onSubmit={register}>
                <input value={username} 
                onChange={ ev => setUsername(ev.target.value)} 
                className='user-input' type="text" placeholder="username"></input>
                <input value={password} 
                onChange={ ev => setPassword(ev.target.value)}
                 className='password-input' type="password" placeholder="create password" ></input>
                 <button type="submit" className="register-button">Register</button>
                </form>
            
                        </div>
        </div>
    )
};

export default Register;