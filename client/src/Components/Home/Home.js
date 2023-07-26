import Navbar from "../Navbar/Navbar";
import logo from '../../image/Colorful Infinite Logo Design (500 × 400 px).png';
import girls from '../../image/istockphoto-1200172348-640_adpp_is.mp4';
import man from '../../image/istockphoto-1206046419-640_adpp_is.mp4';
import woman from '../../image/istockphoto-1316432597-640_adpp_is.mp4';
import "./Home.css";

const Home = () => {
    return (
        <div className="container">
            <Navbar />
            <div className='home-container'>
                <img className='home-logo' src={logo} />

                <div className='home-snippet1'>
                    <h1>Connect with everyone around the planet</h1>
                    
                    <p>ChatPlanet makes it easy to connect with others and communicate around the globe.</p>

                    <div className='home-btns'>
                    <button className='home-btn signUp'><a className='home-btn-link' href='/register'>Sign up</a></button>
                    <button className='home-btn login'><a className='home-btn-link' href='/login'>Login</a></button>
                    </div>
                </div>
            </div>
            
            <div className='home-snippet2'>
                    <h1>Stress free international chatting, all in one place</h1>
                    
                    <p>Send messages and media files all in one workspace. Control who can join with invites only access, data encryption and data export.</p>
            </div>
                
                <div className='content'>
                   
                    <div className='woman-block'>
                         <video src={woman} autoPlay loop muted />
                         <div className='home-text'>
                            <h1>sdfgsdfgsdfg</h1>
                            <p>asdfkj af asdlkfjalks;dfjalkjelkj fe klfafej efjelfjkdfjslddj  sldkfjksdj dkfjfd kfslkafj;k </p>
                         </div>
                    </div>

                    <div className='man-block'>
                         <div className='home-text'>
                            <h1>sdfgsdfgsdfg</h1>
                            <p>asdfkj af asasdfalkj fe klfafej efjelfjkdfjslddj  sldkfjksdj dkfjfd kfslkafj;k </p>
                         </div>
                         
                        <video src={man} autoPlay loop muted />
                    </div>
                    
                    <div className="girls-block">
                         <video src={girls} autoPlay loop muted />
                         <div className='home-text'>
                            <h1>sdfgsdfgsdfg</h1>
                            <p>asdfkj af asdlkfjalks;dfjalkjelkj fe klfafej efjelfjkdfjslddj  sldkfjksdj dkfjfd kfslkafj;k </p>
                         </div>
                    </div>

                </div>
        </div>
    )
};

export default Home;
