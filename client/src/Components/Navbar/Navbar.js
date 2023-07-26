// import Button from 'react-bootstrap/Button';
import logo from '../../image/smallchatplanetlogo.jpg'
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

const Navbar = () => {
    return (
        <div className="nav-container">
            <nav className="navbar">
                <div className='icon'>
                   <img className='icon' src={logo} alt='chat planet logo' />
                </div>
                
                <div className='nav-items'>
                    <ul className='nav-list'>
                        <li><a className='btn-link' href='/'>Home</a></li>
                        <li><a className='btn-link' href='/dashboard'>Dashboard</a></li>
                        <li><a className='btn-link' href='/pricing'>Pricing</a></li>
                        <li><a className='btn-link' href='/contactUs'>Contact us</a></li>
                    </ul>
                </div>  
            </nav>

        </div>
    );
};

export default Navbar;