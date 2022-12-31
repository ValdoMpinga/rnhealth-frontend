import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/main.css'
import '../styles/pages/profile.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import { MuiTelInput } from 'mui-tel-input'
import Button from '../components/Button';
import { RNHEALT_LIVER, NINE_HOURS_IN_MILISECOUNDS, RNHEALT_GRAPE_PURPLE } from '../utils/Constants';

function Profile()
{
  const [phone, setPhone] = useState('')

  const handleChange = (newPhone) =>
  {
    setPhone(newPhone)
  }

  const handleUserRegister = (e) =>
  {
    e.preventDefault()
  }


  return (
    <div className='app'>
      <Navbar />
      <main>
        <Container className='mt-4 px-5'>
          <Row className='row text-center'>
            <h2 className='title'>
              Create an account!
            </h2>
          </Row>

          <form>
            <Container className='container'>

              <Row className='row'>
                <Col className="col d-flex flex-column">
                  <TextField
                    size="medium"
                    fullWidth
                    className='input'
                    id="filled-search"
                    label="First name"
                    type="text"
                    variant="outlined"
                  />


                </Col>

                <Col className="col d-flex flex-column">
                  <TextField
                    id="filled-search"
                    label="Last name"
                    type="text"
                    variant="outlined"
                  />
                </Col>
              </Row>

              <Row className='row'>
                <Col className="col d-flex flex-column">
                  <TextField
                    className='email'
                    id="filled-search"
                    label="Email"
                    type="email"
                    variant="outlined"
                  />


                </Col>


                <Col className="col d-flex flex-column">
                  <MuiTelInput
                    value={phone}
                    onChange={handleChange}
                    placeholder='Phone number'
                    defaultCountry='PT'
                  /></Col>

              </Row>


              <Row>
                <Col className="col d-flex flex-column"
                >
                  <TextField
                    id="filled-search"
                    label="Password"
                    type="password"
                    variant="outlined"
                  />

                </Col>

                <Col className="col d-flex flex-column">

                  <TextField
                    id="filled-search"
                    label="Confirm password"
                    type="password"
                    variant="outlined"
                  />
                </Col>

              </Row>


              <Row>
                <Col
                  className="col d-flex flex-column"
                >

                  <TextField
                    id="filled-search"
                    label="Region"
                    type="text"
                    variant="outlined"
                  />



                </Col>

                <Col className="col d-flex flex-column">
                  <TextField
                    id="filled-search"
                    label="Postal code"
                    type="text"
                    variant="outlined"
                  />
                </Col>

              </Row>


              <Row>
                <Col className="col d-flex flex-column">
                  <TextField
                    id="filled-search"
                    label="Address"
                    type="txt"
                    variant="outlined"
                  />


                </Col>

                <Col className="col d-flex flex-column">

                  <TextField
                    id="filled-search"
                    label="City"
                    type="text"
                    variant="outlined"
                  />
                </Col>

              </Row>


            </Container>

            <Button
              name='Register'
              color={RNHEALT_GRAPE_PURPLE}
              width='100px'
              height='40px'
            />

          </form>

        </Container>
      </main>
    </div>
  )
}

export default Profile
