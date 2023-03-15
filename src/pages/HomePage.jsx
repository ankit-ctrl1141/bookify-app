import Button from 'react-bootstrap/Button';
import { useFirebase } from "../context/Firebase"


const HomePage = ()=>{

    const firebase = useFirebase();
    console.log(firebase);

    const logOutHandler = ()=>{
        firebase.logOutUser();
        console.log("successfully logged out");
    }
    return <div className="container mt-5">
        <h1 className='mb-4'>HomePage...</h1>
        <Button onClick = {logOutHandler} variant='success'>LogOut</Button>
    </div>
}

export default HomePage;