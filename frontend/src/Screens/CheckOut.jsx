import React, { useState } from "react";
import { productContent } from "../data/data";
import { FaTimes } from "react-icons/fa";

const CheckOut = ({ onClose }) => {
    const [step, setStep] = useState("contact");
    const [contact, setContact] = useState({ phone: "", email: "" });
    const [coupon, setCoupon] = useState("");

    // Fixed total price calculation
    const totalPrice = productContent.reduce((acc, item) => acc + item.cost, 0);
    

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-[95%] md:w-[60%] lg:w-[50%] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-2xl relative">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                    <FaTimes size={24} />
                </button>

                {/* Steps Navigation */}
                <div className="flex justify-around border-b pb-3 text-gray-700 text-lg">
                    <button onClick={() => setStep("contact")} className={`${step === "contact" ? "font-bold text-black" : "text-gray-500"}`}>
                        Contact
                    </button>
                    <button onClick={() => setStep("address")} className={`${step === "address" ? "font-bold text-black" : "text-gray-500"}`}>
                        Address
                    </button>
                    <button onClick={() => setStep("payment")} className={`${step === "payment" ? "font-bold text-black" : "text-gray-500"}`}>
                        Payment
                    </button>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 p-4 rounded-md mt-4 shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 text-center">Order Summary</h2>
                    
                    {/* Products List */}
                    <div className="flex overflow-x-auto gap-2 py-2">
                        {productContent.map((item, index) => (
                            <div key={item.id} className="flex flex-col items-center">
                                <div className="hidden"></div>
                                
                                <img src={item.img} alt={item.title} className="w-16 h-16 rounded border shadow-sm" />
                                <span className="text-gray-600 text-sm">{item.price} Rs</span>
                            </div>
                        ))}
                    </div>

                    {/* Corrected Total Price Display */}
                    <p className="mt-2 text-gray-700 font-semibold text-center">
                        Total: <span className="text-lg text-black">Rs {totalPrice}</span>
                    </p>
                </div>

                {/* Contact Details */}
                {step === "contact" && (
                    <div className="mt-4">
                        <label className="block text-gray-700 text-lg font-semibold">Phone Number</label>
                        <input
                            type="text"
                            value={contact.phone}
                            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            className="w-full border p-3 rounded mt-1 text-lg"
                            placeholder="Enter phone number"
                        />
                        <label className="block text-gray-700 mt-3 text-lg font-semibold">Email</label>
                        <input
                            type="email"
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            className="w-full border p-3 rounded mt-1 text-lg"
                            placeholder="Enter email address"
                        />
                    </div>
                )}

                {/* Coupon Code */}
                <div className="mt-4">
                    <label className="block text-gray-700 text-lg font-semibold">Apply Coupon (if any)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="w-full border p-3 rounded text-lg"
                            placeholder="Enter coupon code"
                        />
                        <button className="bg-gray-700 text-white px-4 py-3 rounded hover:bg-gray-800">
                            Apply
                        </button>
                    </div>
                </div>

                {/* Continue Button */}
                <button className="bg-black text-white w-full py-3 mt-5 rounded-lg text-lg hover:bg-gray-800">
                    Continue to Payment
                </button>
            </div>
        </div>
    );
};

export default CheckOut;



