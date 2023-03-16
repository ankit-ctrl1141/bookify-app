import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const ViewOrderDetails = ()=>{
    const params = useParams();
    const firebase = useFirebase();

    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs))
    },[])



    // console.log(params.bookId);
//    console.log(orders)

    return <div className="container mt-5">
         <h1>Order Details:</h1>
         { orders.map((order) => {
                const data = order.data();
                return <div key={order.id} className="mt-5" style={{ border: "1px solid", padding : "25px"}}>
                    <h5>Order By: {data.displayName}</h5>
                    <h6>Qty: {data.qty}</h6>
                    <p>Email: {data.userEmail}</p>
                </div>;        
            })
         }
    </div>
}

export default ViewOrderDetails;