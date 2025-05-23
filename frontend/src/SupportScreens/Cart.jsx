"use client";

import React, { useEffect, useRef, useState } from "react";
import { productContent } from "../data/data";
import { Currency, X } from "lucide-react"; // Ensure you have lucide-react installed, or replace with another icon
import { useDispatch, useSelector } from "react-redux";
import { passOrder, showStatus } from "../actions";
import { Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import kumbhLogo from "../assets/images/kumbh.jpg"

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartState = useSelector((state) => state.changeStatus);
    const cartPassedItems = useSelector((state) => state.passCartItem);
    const [cartShowItems, setCartShowItems] = useState(null);
    const [cartItems, setCartItems] = useState(
        productContent.map((item) => ({ ...item, quantity: 1 }))
    );

    const inputRef = useRef();

    const [itemQuantity, setItemQuantity] = useState(1);
    //const itemQuantity = new Map();

    let passingOrder = {

    };

    
    

    useEffect(() => {
        if (cartPassedItems[0] === undefined) {
            setCartShowItems(null);

        }
        else if (cartPassedItems[0].length > 0) {

            setCartShowItems(cartPassedItems[0]);

        }

        // for(let i=0; i<cartPassedItems[0].length; i++)
        // {
        //     setItemQuantity(itemQuantity.push(1));
        // }

        //console.log(cartPassedItems);
        //console.log(cartPassedItems[0]);
    }, [])

    const [cartPage, setCartPage] = useState(true);

    const handleIncrease = (quantity) => {
        /*setCartItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + 1 } : item
            )
        );*/
        // let id = item._id + "";
        // let quantity = itemQuantity.get(id);
        // quantity = quantity+1;
        // itemQuantity.set(id, quantity);
        // itemQuantity[index] += 1;
        // setItemQuantity(itemQuantity);
        let q = document.getElementById("quantity").innerText;
        q = Number(q);
        q += 1;
        document.getElementById("quantity").innerText = q;
    };

    const handleDecrease = (e) => {
        /*setCartItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );*/
        // let id = item._id + "";
        // let quantity = itemQuantity.get(id);
        // if(quantity>1){
        //     quantity = quantity-1;
        // }
        // itemQuantity.set(id, quantity);

        // let q = document.getElementById("quantity").innerText;
        // q = Number(q);
        // if(q>1)
        // {
        //     q -= 1;
        // }
        // document.getElementById("quantity").innerText = q;

        let value = Number(inputRef.current.value);
        console.log(value);
    };

    const deleteCartItem = async (item, index) => {
        console.log(item._id);
        let result = await fetch(`http://localhost:5000/deleteCartItem/${item._id}`, {
            method: "DELETE",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        console.log(result);
        navigate("/");
        window.location.reload();
        //setItemQuantity(itemQuantity.splice(index,1));
    }

    const checkout = async ()=>{
        let emailId = JSON.parse(localStorage.getItem('user')).email;

        let result = await fetch(`http://localhost:5000/cart/${emailId}`,{
            method: "GET",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token')),
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        result.forEach((item)=>{
            passingOrder[item.title] = item.quantity;
        })
        dispatch(passOrder(passingOrder));
        navigate('/check');
        dispatch(showStatus());
    }

    const fixQuantity = async (id, quantity) =>{
        //console.log(id, quantity);
        let result = await fetch(`http://localhost:5000/cartQuantity/${id}`, {
            method: "PUT",
            body: JSON.stringify({id, quantity}),
            headers: {
                authorization: JSON.parse(localStorage.getItem("token")),
                'Content-Type': 'application/json'
            }

        })
        result = await result.json();
        console.log(result);
        setItemQuantity(1);
    }

    return (

        <div className={cartState ? "fixed top-0 right-0 w-[400px] h-screen bg-pink-50 z-20 p-4 shadow-lg overflow-y-auto duration-200"
            : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-200"}>

            {/* Close Button */}
            <button className="absolute top-2 right-2 p-2" onClick={() => dispatch(showStatus())}>
                <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-700 mb-4 headStyle">Your Cart</h2>
            <div className="flex flex-col gap-4">
                {cartShowItems ? <>
                    {cartShowItems.map((item, index) => (
                        <div key={index} className="flex items-center p-2 border-b border-gray-300">
                            {/* Image on the left */}
                            <div className="w-1/3 p-2">
                            
                                <img src={`data:image/jpg;base64,${item.img}`} alt={item.title} className="w-full h-auto rounded-lg object-cover" />
                            
                                </div>
                            {/* Details on the right */}
                            <div className="w-2/3 flex flex-col justify-between">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-gray-600">Rs {item.price}</p>
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-4 mt-2">
                                    <button onClick={() => handleDecrease(item.quantity)} className="px-2 py-1 bg-gray-300 rounded itemSelect hidden">-</button>
                                    <h2 id="quantity" className="text-lg font-medium hidden">{item.quantity}</h2>
                                    <input type="number" className="bg-white w-12 h-9 p-2" placeholder="1" min={1} ref={inputRef} onChange={(e)=>setItemQuantity(e.target.value)}/>
                                    <button onClick={() => fixQuantity(item._id, itemQuantity)} className="px-2 py-1 bg-gray-300 rounded itemSelect">fix quantity</button>
                                    <Trash2Icon size={25} className="cursor-pointer" onClick={() => deleteCartItem(item, index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </> :
                    <h2 className="headStyle text-2xl">No item added to cart</h2>
                }
            </div>
            {cartShowItems ?
                <button type="button" className="checkOut m-2 text-white" onClick={()=>checkout()}>CheckOut</button>
                : <></>
            }
        </div>
    );
};

export default Cart;
