import { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from '../components/Card';
import { CardGroup } from "react-bootstrap";

const ViewOrdersPage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn) {
            firebase.fetchMyBooks(firebase.user.uid)?.then((value) => setBooks(value.docs));
        }
    }, [firebase])

    // console.log(books);
    
    
    if (!firebase.isLoggedIn) return <h1 style={{textAlign: "center"}}>Please Log In to see Order History...</h1>

    const orderWarning = <div>
        <h3 style={{textAlign: "center"}}>You don't have any Orders. To get some order, you must Add books for Sell in "Add Listing" section. Then anyone can buy your book, and it will get appered here in "Orders" section.  </h3>
    </div>
    return (


        <div className="container mt-3">
           
            <CardGroup>

                {books.length === 0 ? orderWarning : books.map((book) => (
                    <BookCard link={`/books/order/${book.id}`} key={book.id} id={book.id} {...book.data()} />
                ))}

            </CardGroup>
        </div>
    );
}

export default ViewOrdersPage;