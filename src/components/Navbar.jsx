import { useRef } from "react";
import '../styles/components/Navbar.css'
import { FaBars, FaTimes } from "react-icons/fa";
import rnhealthLogo from '../assets/logos/rnhealth_logo.svg'
import { Link } from 'react-router-dom'
function Navbar()
{

    const navRef = useRef();

    const showNavbar = () =>
    {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
            <img
                className="rnhealth_logo"
                src={rnhealthLogo}
                alt="RnHealth Logo"
                width="120"
            />
            <nav ref={navRef}>
                {/* can use navlink in the future */}
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/sensors/:id">Sensors</Link>
                <a href="/#">Contacts</a>
                <a href="/#">About</a>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar
