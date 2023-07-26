// import Button from 'react-bootstrap/Button';
import logo from '../../image/smallchatplanetlogo.jpg'
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

// active state coloring

// const activePage = window.location.pathname;
// console.log(activePage)
// const navLinks = document.querySelectorAll('nav a').forEach(link => {
//    if(link.href.includes(`${activePage}`)){
//     link.classList.add('active');
//    } 
// })

// nav bar component


const Logout = (props) => {
    let navigate = useNavigate();
    const logout_working = async () => {
        sessionStorage.removeItem("loggedin");
        props.setSession({
            personal: {
                username: "",
            },
            isLoggedIn: false,
        });
        navigate("/login");
    };
    return (
        <div className="nav-container">
            <nav className="navbar">
                <div className='icon'>
                    <img className='icon' src={logo} alt='chat planet logo' />
                </div>

                <div className='nav-items'>
                    <ul className='nav-list'>
                        <li><a className='btn-link' href='/'>Home</a></li>
                        <li><a className='btn-link' href='/contactUs'>Contact us</a></li>
                        <li><span className='btn-link'
                            onClick={logout_working}>Log Out</span></li>
                    </ul>
                </div>
            </nav>

        </div>
    );
};

export default Logout;