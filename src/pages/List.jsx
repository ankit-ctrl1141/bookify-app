import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

import { useFirebase } from "../context/Firebase";

const ListingPage = () => {
    const firebase = useFirebase();

    const [bookName, setBookName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState("");


    const onSubmitHandler = async (e) => {
          e.preventDefault();
          await firebase.handleCreateNewListing(bookName, isbnNumber, price, coverPic);
          alert("Submitted Successfully...")
    }

    return <div className="container mt-5">
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Book Name</Form.Label>
                <Form.Control onChange={(e) => setBookName(e.target.value)} type="text" placeholder="Book Name" value={bookName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control onChange={(e) => setIsbnNumber(e.target.value)} type="text" placeholder="ISBN Number" value={isbnNumber} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={(e)=>setPrice(e.target.value)} type="text" placeholder="Enter Price" value={price} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cover Image</Form.Label>
                <Form.Control onChange={(e)=>setCoverPic(e.target.files[0])} type="file"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Details
            </Button>
        </Form>
    </div>
}

export default ListingPage;