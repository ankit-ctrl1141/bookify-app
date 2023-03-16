import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from "../context/Firebase";


const BookDetailPage = () => {

    const params = useParams();   // to get the bookId
    const firebase = useFirebase();

    const [qty, setQty] = useState(1);

    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, [])

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data]);

    const placeOrder = async () => {
         const result = await firebase.placeOrder(params.bookId, qty);
        //  console.log("Order Placed", result);
        if(result){
            alert("Order Placed Successfully...")
        }
    }

    if (data == null) {
        return <h1>Loading...</h1>
    }

    // console.log(params);
    return <div className="container mt-3 mb-5">
        <h2>{data.name}</h2>
        <img src={url} width="30%" style={{ borderRadius: "10px" }} />
        <h4>Details</h4>
        <p>Price: ₹{data.price}</p>
        <p>ISBN Number: {data.isbn}</p>
        <h4>Owner Details</h4>
        <p>Name: {data.displayName ? data.displayName : "Anonymous"}</p>
        <p>Email: {data.userEmail}</p>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Qty:</Form.Label>
            <Form.Control onChange={(e) => setQty(e.target.value)} type="number" placeholder="Enter Quantity" value={qty} />
        </Form.Group>
        <Button onClick={placeOrder} variant="success">Buy Now</Button>
    </div>
}

export default BookDetailPage;