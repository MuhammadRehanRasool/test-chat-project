import Navbar from "../Navbar/Navbar";
import outworlder from '../../image/outworlder.png';
import earthling from '../../image/earthling.png';
import astronaut from '../../image/astronaut.png';
import "./Pricing.css";

const Pricing = () => {
    return (
        <div className="container">
            <Navbar />
            <div className='pricing-container'>

                <img className='hero-img' src='https://images.unsplash.com/photo-1543269865-0a740d43b90c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'/>

                <div className='pricing-snippet'>
                    <h2>Memberships</h2>
                    <p className='price-text'>There are three membership tierlists that cater to various needs and preferences. The first tierlist focuses on fitness enthusiasts, offering premium access to state-of-the-art gyms, personalized training programs, and exclusive wellness perks. The second tierlist revolves around entertainment, providing members with priority seating at concerts, backstage passes, and exclusive meet-and-greet opportunities with their favorite artists. Lastly, the third tierlist targets avid travelers, granting access to luxury accommodations, tailored travel itineraries, and VIP experiences, ensuring unforgettable journeys around the world. These tierlists offer unique privileges, allowing individuals to indulge in their passions and enhance their lifestyles.</p>
                </div>

            </div>

            <div className='mem-cards'>                
                {/* basic membership */}
                <div className='earthling card'>
                    <img className='pricing-icon' src={earthling} />
                    <h2>Earthling</h2>
                    <p>All core features</p>
                    <p>/month</p>

                    <div className='pricing-btn'>
                        <button className='current blur'>Current Membership</button>
                    </div>
                    
                </div>
                
                {/* unlimited membership */}
                <div className='astronaut card'>
                    <img className='pricing-icon' src={astronaut} />
                    <h2>Astronaut</h2>
                    <p>All core features</p>
                    <p>/month</p>

                    <div className='mem-btn'>
                        <button className='trial price-btn'>Free trail</button>
                    </div>
                </div>

                {/* premium membership */}
                <div className='outworlder card'>
                    <img className='pricing-icon' src={outworlder} />
                    <h2>Outworlder</h2>
                    <p>All core features</p>
                    <p>/month</p>

                    <div className='mem-btn'>
                        <button className='trail price-btn'>Free trial</button>
                    </div>
                </div>

            </div>
              
        </div>
    )
};

export default Pricing;
