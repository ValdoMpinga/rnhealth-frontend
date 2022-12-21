import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Sensors()
{
    const { id } = useParams()
    
    return (
        <div
            className='app'>
            <Navbar />
            <main>

            </main>
            <Footer />
        </div>
    )
}

export default Sensors
