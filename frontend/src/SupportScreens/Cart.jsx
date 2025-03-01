import React, { useState } from "react";
import { productContent } from "../data/data";
import { X } from "lucide-react"; // Ensure you have lucide-react installed, or replace with another icon
import { useDispatch, useSelector } from "react-redux";
import { showStatus } from "../actions";

const Cart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state)=>state.changeStatus);
    const [cartItems, setCartItems] = useState(
        productContent.map((item) => ({ ...item, quantity: 1 }))
    );

    const [cartPage, setCartPage] = useState(true);

    const handleIncrease = (index) => {
        setCartItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrease = (index) => {
        setCartItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };


    return (
        
        <div className={cartState? "fixed top-0 right-0 w-[400px] h-screen bg-pink-50 z-20 p-4 shadow-lg overflow-y-auto duration-200"
        : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-200"}>
            
            {/* Close Button */}
            <button className="absolute top-2 right-2 p-2" onClick={() => dispatch(showStatus())}> 
                <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-700 mb-4 headStyle">Your Cart</h2>
            <div className="flex flex-col gap-4">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center p-2 border-b border-gray-300">
                        {/* Image on the left */}
                        <div className="w-1/3 p-2">
                            <img src={item.img} alt={item.title} className="w-full h-auto rounded-lg object-cover" />
                        </div>
                        {/* Details on the right */}
                        <div className="w-2/3 flex flex-col justify-between">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-600">Rs {item.price}</p>
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4 mt-2">
                                <button onClick={() => handleDecrease(index)} className="px-2 py-1 bg-gray-300 rounded itemSelect">-</button>
                                <h2 className="text-lg font-medium">{item.quantity}</h2>
                                <button onClick={() => handleIncrease(index)} className="px-2 py-1 bg-gray-300 rounded itemSelect">+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" className="checkOut m-2 text-white">CheckOut</button>
        </div>
    );
};

export default Cart;
