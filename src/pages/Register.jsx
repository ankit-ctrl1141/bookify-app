import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebase } from "../context/Firebase"

const Register = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (firebase.isLoggedIn) {
            // naviagte to home if user is already logged in
            navigate("/");
            // console.log("user is already logged in....");
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Signing Up...")
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
        // console.log("Successfully Signed Up", result);
    }

  
    return <div className="container mt-5">
        <h2 className='mb-3'>Register Page </h2>
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
                Create Account
            </Button>

            <div className='mt-3'>
                <Form.Text >
                    <h6>Already have an Account. <Link to="/login" >Log In </Link></h6>
                </Form.Text>
            </div>
            <h5 className="mt-3 mb-3"> OR </h5>
            <div >
                <Button onClick={firebase.signInWithGoogle} variant='danger'>SignUp with Google</Button>
            </div>

        </Form>
    </div>
}

export default Register;
