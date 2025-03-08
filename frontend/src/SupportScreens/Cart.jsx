import React, { useEffect, useState } from "react";
import { productContent } from "../data/data";
import { X } from "lucide-react"; // Ensure you have lucide-react installed, or replace with another icon
import { useDispatch, useSelector } from "react-redux";
import { showStatus } from "../actions";
import { Trash2Icon } from "lucide-react";

const Cart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.changeStatus);
    const cartPassedItems = useSelector((state) => state.passCartItem);
    const [cartShowItems, setCartShowItems] = useState(null);
    const [cartItems, setCartItems] = useState(
        productContent.map((item) => ({ ...item, quantity: 1 }))
    );

    const itemQuantity = new Map();


    useEffect(() => {
        if(cartPassedItems[0] === undefined)
        {
            setCartShowItems(null);
            
        }
        else if (cartPassedItems[0].length > 0) {
            
            setCartShowItems(cartPassedItems[0]);
            
        }

        if(cartShowItems)
        {
            cartShowItems.forEach(element => {
                let id = element._id + "";
                itemQuantity.set(id,1);
            });
        }
        //console.log(cartPassedItems);
        //console.log(cartPassedItems[0]);
    }, [])

    const [cartPage, setCartPage] = useState(true);

    const handleIncrease = (index, item) => {
        /*setCartItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + 1 } : item
            )
        );*/
        let id = item._id + "";
        let quantity = itemQuantity.get(id);
        quantity = quantity+1;
        itemQuantity.set(id, quantity);
    };

    const handleDecrease = (index, item) => {
        /*setCartItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );*/
        let id = item._id + "";
        let quantity = itemQuantity.get(id);
        if(quantity>1){
            quantity = quantity-1;
        }
        itemQuantity.set(id, quantity);
    };

    const deleteCartItem = async (item)=>{
        console.log(item._id);
        let result = await fetch(`http://localhost:5000/deleteCartItem/${item._id}`, {
            method: "DELETE",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        console.log(result);
        window.location.reload();
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
                                    <button onClick={() => handleDecrease(index, item)} className="px-2 py-1 bg-gray-300 rounded itemSelect">-</button>
                                    <h2 className="text-lg font-medium">{itemQuantity}</h2>
                                    <button onClick={() => handleIncrease(index, item)} className="px-2 py-1 bg-gray-300 rounded itemSelect">+</button>
                                    <Trash2Icon size={25} className="cursor-pointer" onClick={()=>deleteCartItem(item)}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </> :
                    <h2 className="headStyle text-2xl">No item added to cart</h2>
                }
            </div>
            {cartShowItems?
                <button type="button" className="checkOut m-2 text-white">CheckOut</button>
                :<></>
            }
        </div>
    );
};

export default Cart;
