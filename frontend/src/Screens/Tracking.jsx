import { StepBack } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Tracking = () => {
    const status = ['Ordered', 'Shipped', 'Delivered'];
    const [orders, setOrders] = useState(null);
    let productName = [];
    let currentStep = 0;

    useEffect(() => {
        getOrderDetails();
    }, []);

    const getOrderDetails = async () => {

        let email = JSON.parse(localStorage.getItem("user")).email;

        let result = await fetch('http://localhost:5000/getTrackOrder', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                authorization: JSON.parse(localStorage.getItem("token")),
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.log(result);
        setOrders(result);

        result.map((order,index)=>{
            let emptyPrdouct = [];
            order.products.map((product, i)=>{
                emptyPrdouct.push(product);
            });
            productName.push(emptyPrdouct);
        })

        
        console.log(productName);
    }

    return (
        <>
            {orders ?
                <>
                    {
                        orders.map((order, index) =>
                            <div className='grid grid-cols-2 sm:grid-cols-1 m-10'>
                                <div className='flex object-cover items-center'>

                                </div>

                                <div className='flex flex-col items-center justify-center'>
                                    <h2 className='text-3xl font-bold mb-4'>Order Tracking</h2>
                                    <div className='flex items-center justify-center gap-4'>
                                        {status.map((step, index) =>
                                            <div key={index} className="flex items-center">
                                                <div
                                                    className={`h-8 w-8 rounded-full flex items-center justify-center font-bold
                            ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                                                >
                                                    ✓
                                                </div>
                                                {index < status.length - 1 && (
                                                    <div className={`h-1 w-8 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex mt-2 gap-10 text-sm font-medium">
                                        {status.map((step, index) => (
                                            <div key={index} className="w-[72px] text-center">
                                                {step}
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-100 m-4'>
                                        <h2 className='text-2xl font-bold m-4'>Order Details</h2>
                                        <div className='flex flex-col p-2 m-1'>
                                            <h2 className='text-xl'>Order Id: {order.orderId}</h2>
                                            <h2 className='text-xl'>Name: {order.name}</h2>
                                            <h2 className='text-xl'>Contact: {order.contact}</h2>
                                            <h2 className='text-xl'>Email: {order.email}</h2>
                                            <h2 className='text-xl'>Address: {order.address}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </>:
                <div className='flex flex-row h-full w-full'>
                <div className='flex flex-col w-[400px] h-[200px] rounded-xl bg-purple-400 items-center justify-center m-10 boxshadow'>
                    <h2 className='text-2xl font-bold'>No Order yet</h2>
                    <p className='text-lg'>Please make an order to view the track status...</p>
                </div>
                </div>
            }
        </>
    )
}

export default Tracking;