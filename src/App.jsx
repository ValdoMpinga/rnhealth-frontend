import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import rnprobeImg from './assets/images/RnProbe.jpg'
import './styles/main.css'
import Button from './components/Button';
import RnColors from './utils/Constants';

function App()
{
  return (
    <div
      className='app'
    >
      <Navbar />
      <main >
        <Container className='container mt-5 mb-5'>
          <Row className='row text-center'>
            <h2 className='title'>
              Your radon monitoring solution is here
            </h2>
          </Row>
          <Row className='row secondRow text-center'>
            <Col className='col-lg mx-auto mt-5 text-center align-items-center'>
              <p className='text-center rnintro'>
                RnHealth is a web application that uses artificial intelligence to predict the levels of radon concentration in your home up to 6 hours ahead so that you can take preventive measures, thus ensuring your health and that of your family against lung cancer.
              </p>
              <Row className='row mt-5'>
                <Col>
                  <Button
                    className=''
                    name="Register"
                    color={RnColors.rnhealthGrapePurple}
                    width='200px'
                    height='50px'
                  />
                </Col>
                <Col>
                  <Button
                    name="More Info"
                    color={RnColors.rnhealthBlack}
                    width='200px'
                    height='50px'
                  />
                </Col>
              </Row>
            </Col>
            <Col className='col-lg mx-auto'>
              <img
                src={rnprobeImg}
                alt="RnHealth Probe"
              />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
