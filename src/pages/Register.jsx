import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../context/Firebase"

const Register = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        if(firebase.isLoggedIn){
            // naviagte to home if user is already logged in
            navigate("/");
            console.log("user is already logged in....");
        }
    },[firebase,navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signing Up...")
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
        console.log("Successfully Signed Up", result);
    }

    return <div className="container mt-5">
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
        </Form>
    </div>
}

export default Register;
