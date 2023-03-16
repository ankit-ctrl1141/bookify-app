import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/Firebase";
import { useNavigate, Link } from 'react-router-dom';

const LogIn = () => {

    const firebase = useFirebase();
    const naviagate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (firebase.isLoggedIn) {
            // navigate to home
            naviagate("/");
            // console.log("User Already Logged In...")
        }
    }, [firebase, naviagate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Loging In...")
        try {
            const result = await firebase.signInWithEmailAndPass(email, password);
            // console.log("Successfully Logged In", result);
        }catch(err){
            alert("You don't have an Account. First Create an Account and then Login with Your Email and Password  OR  directly Sign In with Gmail.")
        }
    }


    return <div className="container mt-5">
         <h2 className='mb-3'>Login Page </h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
        </Form>
        <h5 className="mt-3 mb-3"> OR </h5>
        <div >
            <Button onClick={firebase.signInWithGoogle} variant='danger'>SignIn with Google</Button>
        </div>
        <div className='mt-3'>
                <Form.Text className="">
                    <h6>Don't have an Account. <Link to="/register" > Create an Account. </Link></h6> 
                </Form.Text>
                </div>
    </div>

}

export default LogIn;
