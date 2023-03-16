
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from 'react';
import BookCard from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const HomePage = ()=>{

    const firebase = useFirebase();
    console.log(firebase);

    const [books, setBooks ] = useState(null);

    // to fetch or retrive data
    useEffect(()=>{
         firebase.listAllBooks().then((books) => setBooks(books.docs));
    },[]);

    // until data is not fetched or retrived, show this...
    if(books == null) {
        return <h1>Loading...Please wait</h1>
    }

    // to logOut the user...
    const logOutHandler = ()=>{
        firebase.logOutUser();
        console.log("successfully logged out");
    }

    return <div className='container mt-5'>

        <CardGroup>
        {
            books.map((book)=> <BookCard key={book.id}  id={book.id} {...book.data()}/> )
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