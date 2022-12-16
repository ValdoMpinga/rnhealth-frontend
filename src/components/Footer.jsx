import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/components/Footer.css'
import ipvcLogo from '../assets/images/ipvcLogo.png'
import aditlabLogo from '../assets/images/aditlabLogo.png'

function Footer()
{
    return (
        <footer
            className=" text-center text-lg-start fixed-bottom ">
            <Container
                className='container mt-4'>
                <Row
                    className='row text-center g-4' >
                    <Col
                        className='col-lg mx-auto'>
                        <img
                            src={aditlabLogo}
                            alt='Aditlab Logo'
                        />
                    </Col>
                    <Col
                        className='col-lg mx-auto'>
                       
                        <img
                            src={ipvcLogo}
                            alt='IPVC Logo'
                        />
                    </Col>
                    <Col
                        className='col-lg mx-auto'>
                        <div
                            className='contacts'>
                            <p className='contactsParagraph'>contacts</p>
                            <p>Phone: +351 258 809 610</p>
                            <p>E-mail: adit@ipvc.pt</p>
                        </div>
                    </Col>
                </Row>
                <hr className='line'/>
                <Row
                    className='text-center'>
                    <p className='copyright' >Copyright © 2023 ADiT-LAB. All Rights Reserved.</p>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
