import { Link } from "react-router";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { passPopup, passPopupOrderId, showPopup } from "../actions";

const OrderList = () => {
    const [orders, setOrders] = useState(null);
    const [searchOrder, setSearchOrder] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        let result = await fetch("http://localhost:5000/getOrders", {
            method: "GET",
            headers: {
                authorization: JSON.parse(localStorage.getItem("token"))
            }
        });

        result = await result.json();
        setOrders(result);
        console.log(result);
    }

    const deleteTheOrder = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            let result = await fetch(`http://localhost:5000/deleteOrder/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token")),
                }
            });
            result = await result.json();
            console.log(result);
            if (result.acknowledged) {
                alert("Item deleted successfully!");
            }
            getOrders();
        }
    }

    const searchItem = async()=>{
        let result = await fetch(`http://localhost:5000/searchDashOrder/${searchOrder}`,{
            method: "GET",
            headers: {
                authorization: JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        console.log(result);
        // let ans = [];
        // ans.push(result);
        if(result)
        {
            setOrders(result);
        }
    }

    const itemsLinkClicked = (item)=>{
        let popupValues = [item.products, item.quantity];
        dispatch(showPopup());        
        dispatch(passPopup(popupValues));
        
        dispatch(passPopupOrderId(item.orderId));
    }

    return (
        <div className="flex flex-col m-3">
            <h2 className="headStyle text-4xl">Orders</h2>
            <div className="flex flex-row m-2">
            <FaSearch size={25} className="m-2 text-white h-[50px] w-[50px] p-2 mr-[-2px] mt-[-0.25px] rounded-l-md cursor-pointer" onClick={()=>searchItem()}/>
                <input type="text" placeholder="search here..." className="rounded-r-md w-[200px] h-[50px] p-2 focus:outline-none bg-white" value={searchOrder} onChange={(e)=>setSearchOrder(e.target.value)}/>   
            </div>
            <table>
                {orders ?
                    <tbody>
                        {orders.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.contact}</td>
                                <td>{item.zip}</td>
                                <td>{item.address}</td>
                                <td><Link to={'/popup/'+item.id} onClick={()=>itemsLinkClicked(item)}>items</Link></td>
                                <td>{item.isPaid}</td>
                                <td>{item.status}</td>
                                <td><FaTrash size={20} className="cursor-pointer" onClick={() => deleteTheOrder(item.id)} /></td>
                            </tr>)
                        )}
                    </tbody> : <></>
                }
            </table>
        </div>
    )
}

export default OrderList;