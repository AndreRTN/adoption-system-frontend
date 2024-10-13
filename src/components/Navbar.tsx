import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
type Props = {}

function NavigationBar({}: Props) {
  return (
    <>
     
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Adoção de animais</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/register">Cadastro</Nav.Link>
            <Nav.Link href="/list">Listar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  )
}

export default NavigationBar