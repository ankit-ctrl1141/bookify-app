import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from "../context/Firebase";
import { Button } from 'react-bootstrap';


const MyNavBar = ()=>{

  const firebase = useFirebase();

  // to logOut the user...
  const logOutHandler = () => {
    firebase.logOutUser();
    alert("Successfully Logged Out...")
}

    return  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="me-auto" style={{flexDirection : "row", justifyContent: "center", alignItems: "center"}}>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/book/list">Add Listing</Nav.Link>
        <Nav.Link href="/book/orders">Orders</Nav.Link>
        {firebase.isLoggedIn ? <Nav.Link href="/"><Button onClick={logOutHandler} variant='success'>LogOut</Button></Nav.Link> : <Nav.Link href="/register">Register/Login</Nav.Link>}
      </Nav>
    </Container>
  </Navbar>

}

export default MyNavBar;

