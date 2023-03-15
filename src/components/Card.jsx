import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardGroup } from "react-bootstrap";

import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {

    const firebase = useFirebase();
    const [url, setURL] = useState(null);

    // to fetch Image

    useEffect(()=>{
        firebase.getImageURL(props.imageURL).then((url)=> setURL(url));
    },[])

    return <CardGroup>
        <Card style={{ width: '18rem', margin : "25px" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
               The book titled {props.name} has been sold by {props.displayName ? props.displayName : "Anonymous" } and this books costs ₹{props.price}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
    </CardGroup>
}

export default BookCard;