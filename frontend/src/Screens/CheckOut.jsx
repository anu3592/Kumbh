import React, { useEffect, useState } from "react";
import axios from "axios";
import kumbhLogo from "../assets/images/kumbh.jpg"

const CheckOut = () => {

    const [name, setName] = useState("");
    const [contact, setContact] = useState(0);
    const [zip, setZip] = useState(0);
    const [address, setAddress] = useState("");

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }

    const onPayment = async (price, itemName) => {
        let user_email = JSON.parse(localStorage.getItem("user")).email;
        //console.log(user_email);
        try {
            const options = {
                courseId: 1,
                amount: price,
                email: user_email,
            }

            const res = await axios.post('http://localhost:5000/api/createOrder', options);
            const data = res.data;
            console.log(data);

            const paymentObject = new (window).Razorpay({
                key: "rzp_test_Dw38PkQut6jH00",
                currency: "INR",
                name: "Kumbh",
                image: kumbhLogo,
                order_id: data.id,
                ...data,

                prefill: {
                    name: "Anurag Tiwari",
                    email: "anurag@example.com",
                    contact: "9999999999", // User's phone
                },

                notes: {
                    address: "User address here", // optional custom address
                },

                handler: function (response) {
                    console.log(response);

                    const options2 = {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    }

                    axios.post('http://localhost:5000/api/verifyPayment', options2).then((res) => {
                        console.log(res.data);
                        if (res.data.success) {
                            alert("Payment Successful");
                        }
                        else {
                            alert("Payemnt Failed");
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                },

                theme: {
                    color: "#CD853F",
                },

                method: {
                    netbanking: true,
                    card: true,
                    wallet: true,
                    upi: true,
                    // disable pay later
                    paylater: false,
                }

            })
            paymentObject.open();
        }
        catch (error) {
            console.log(error);
        }
    }

    const submit = async (e) => {
        e.preventDefault();

        let result = await fetch("http://localhost:5000/checkout", {
            method: "POST",
            body: JSON.stringify({ name, contact, zip, address }),
            headers: {
                authorization: JSON.parse(localStorage.getItem("token")),
                'content-type': 'application/json'
            }
        })

        result = await result.json();
        console.log(result);

        onPayment(100, "dummy");

    }


    useEffect(() => {
        loadScript('http://checkout.razorpay.com/v1/checkout.js')
    }, [])

    return (
        <div className="flex flex-col h-full w-screen justify-center items-center mt-10 ml-2 mb-2 mr-2 rounded-2xl">
            <h2 className="headStyle text-3xl font-bold">Enter Your Details</h2>
            <div className="flex flex-col">
                <input type="text" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter your name..." onChange={(e) => setName(e.target.value)} />
                <input type="number" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter your phone number..." onChange={(e) => setContact(e.target.value)} />
                <input type="number" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the zip code..." onChange={(e) => setZip(e.target.value)} />
                <textarea cols="5" rows="3" placeholder="Enter the Address..." className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" onChange={(e) => setAddress(e.target.value)}></textarea>
                <button type="button" className="w-[30%] text-[2vw] m-2 text-white bg-white" style={{ backgroundColor: "blue" }} onClick={(e) => submit(e)}>Submit</button>
            </div>
        </div>
    )
}

export default CheckOut;
