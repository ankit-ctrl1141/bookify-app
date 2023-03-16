
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from 'react';
import BookCard from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';


const HomePage = () => {

    const firebase = useFirebase();
  

    const [books, setBooks] = useState(null);

    // to fetch or retrive data
    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs));
    }, []);

    // until data is not fetched or retrived, show this...
    if (books == null) {
        return <div style={{display: "flex",  justifyContent: "center",color:"green"}}>
            <h1>Loading...Please wait...</h1>
        </div>
    }

    

    return <div className='container mt-5'>

        <CardGroup>
            {
                books.map((book) => <BookCard link = {`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />)
            }
        </CardGroup>
       
    </div>
}

export default HomePage;


