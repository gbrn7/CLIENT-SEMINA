import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import SNavlink from '../Navlink'
import { useNavigate } from 'react-router-dom'

function SNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Semina</Navbar.Brand>
        <Nav className="me-auto">
          <SNavlink action={() => navigate('/')} >Home</SNavlink>
          <SNavlink action={() => navigate('/categories')} >Categories</SNavlink>
          <SNavlink action={() => navigate('/talents')} >Talent</SNavlink>
          <SNavlink action={() => navigate('/payments')} >Payments</SNavlink>
          <SNavlink action={() => navigate('/events')} >Events</SNavlink>
          <SNavlink action={() => navigate('/participant')} >Participant</SNavlink>
          <SNavlink action={() => navigate('/order')} >Order</SNavlink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default SNavbar