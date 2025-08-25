import React, { useEffect, useState } from "react";
import axios from "axios";
import kumbhLogo from "../assets/images/kumbh.jpg"
import { useSelector } from "react-redux";
import passOrderItem from "../reducers/passOrderItem";
import { useNavigate } from "react-router";

const CheckOut = () => {

    const [name, setName] = useState("");
    const [contact, setContact] = useState(0);
    const [zip, setZip] = useState(0);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const orderedItems = useSelector((state) => state.passOrderItem);
    const [ordersRecieved, setOrdersRecieved] = useState(null);
    const navigate = useNavigate();
    let orderId = Math.floor(1000000000 + Math.random() * 9000000000);
    const regex = /^\d{10}$/;
    const regex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

                    axios.post('http://localhost:5000/api/verifyPayment', options2).then(async (res) => {
                        console.log(res.data);
                        if (res.data.success) {

                            let getOrderForPaid = await fetch(`http://localhost:5000/checkout/${orderId}`, {
                                method: "POST",
                                body: JSON.stringify(orderedItems),
                                headers: {
                                    authorization: JSON.parse(localStorage.getItem("token")),
                                    'Content-Type': 'application/json'
                                }
                            });
                            getOrderForPaid = await getOrderForPaid.json();
                            console.log("data", getOrderForPaid);


                            let changePaidStatus = await fetch(`http://localhost:5000/paid/${getOrderForPaid._id}`, {
                                method: "PUT",
                                body: JSON.stringify({ isPaid: "paid", status: "Ordered" }),
                                headers: {
                                    authorization: JSON.parse(localStorage.getItem("token")),
                                    'Content-Type': 'application/json'
                                }
                            });
                            changePaidStatus = await changePaidStatus.json();
                            console.log(changePaidStatus);

                            alert("Payment Successful");
                            navigate('/');
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
                    upi: true,
                    netbanking: true,
                    card: true,
                    wallet: true,
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
        if (name == "" || !contact || !zip || email == "" || address == "") {
            alert("Please enter all Credentials");
        }
        else {

            if (regex.test(contact)) {

                if(regex2.test(email))
                {
                if (orderedItems[0]) {
                    let products = [];
                    let quantity = [];
                    for (let key in orderedItems[0]) {
                        products.push(`${key}`);

                        quantity.push(orderedItems[0][`${key}`]);
                    }
                    console.log(orderedItems);
                    let ownerEmail = JSON.parse(localStorage.getItem("user")).email;
                    //console.log(products);
                    console.log("OrderId", orderId);
                    let result = await fetch("http://localhost:5000/checkout", {
                        method: "POST",
                        body: JSON.stringify({ name, contact, email, zip, address, products, quantity, orderId, ownerEmail }),
                        headers: {
                            authorization: JSON.parse(localStorage.getItem("token")),
                            'content-type': 'application/json'
                        }
                    })

                    result = await result.json();
                    console.log(result);

                    onPayment(100, "dummy");
                }
                else {
                    alert("Please Don't refresh the checkout page while moved from cart page your data is lost... Try Again!!!");
                    navigate('/');
                }
            }
            else{
                alert("Please enter valid email address");
            }
            }
            else {
                alert("Please enter valid mobile number");
            }
        }
    }

    useEffect(() => {
        if (orderedItems[0] === undefined) {
            setOrdersRecieved(null);

        }
        else if (orderedItems[0].length > 0) {

            setOrdersRecieved(orderedItems[0]);

        }
        console.log(orderedItems[0]);
    }, [])

    useEffect(() => {

        loadScript('http://checkout.razorpay.com/v1/checkout.js')
    }, [])

    return (
        <div className="flex flex-col h-full w-full justify-center items-center mt-25 ml-2 mb-2 mr-2 rounded-2xl">

            <h2 className="headStyle text-3xl font-bold">Enter Your Details</h2>
            <div className="flex flex-col">
                <input type="text" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter your name..." onChange={(e) => setName(e.target.value)} />
                <input type="number" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter your phone number..." onChange={(e) => setContact(e.target.value)} />
                <input type="email" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
                <input type="number" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the zip code..." onChange={(e) => setZip(e.target.value)} />
                <textarea cols="5" rows="3" placeholder="Enter the Address..." className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" onChange={(e) => setAddress(e.target.value)}></textarea>
                <button type="button" className="w-[30%] text-[2vw] m-2 text-white bg-white" style={{ backgroundColor: "blue" }} onClick={(e) => submit(e)}>Submit</button>
            </div>
        </div>
    )
}

export default CheckOut;
