import Button from 'react-bootstrap/Button';
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from 'react';
import BookCard from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const HomePage = ()=>{

    const firebase = useFirebase();
    console.log(firebase);

    const [books, setBooks ] = useState([]);

    // to fetch or retrive data
    useEffect(()=>{
         firebase.listAllBooks().then((books) => setBooks(books.docs));
    },[]);

    // to logOut the user...
    const logOutHandler = ()=>{
        firebase.logOutUser();
        console.log("successfully logged out");
    }

    return <div className='container mt-5'>

        <CardGroup>
        {
            books.map((book)=> <BookCard key={book.id} {...book.data()}/> )
        }
        </CardGroup>
    </div>
}

export default HomePage;


/* <div className="container mt-5">
        <h1 className='mb-4'>HomePage...</h1>
        <Button onClick = {logOutHandler} variant='success'>LogOut</Button>
    </div>
*/