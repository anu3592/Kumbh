import { StepBack } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import SimpleImageSlider from "react-simple-image-slider";
import Spinner from '../SupportScreens/Spinner';

const Tracking = () => {
    const status = ['Ordered', 'Shipped', 'Delivered'];
    const [orders, setOrders] = useState(null);
    const [productName, setProductName] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [track, setTrack] = useState([]);
    let currentStep = 0;

    /*useEffect(() => {
        getOrderDetails();

    }, [productImage]);

    // useEffect(()=>{
    //     getImageDetail();
    // },[])

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

        result.map((order, index) => {
            let emptyPrdouct = [];
            order.products.map((product, i) => {
                emptyPrdouct.push(product);
            });
            setProductName(productName.push(emptyPrdouct));
        })

        productName.map(async (product, index) => {
            let emptyArr = [];
            product.map(async (item, index) => {
                let getImages = await fetch(`http://localhost:5000/getTrackImages/${item}`, {
                    method: 'GET',
                    headers: {
                        authorization: JSON.parse(localStorage.getItem('token')),
                        'Content-Type': 'application/json'
                    }
                });
                getImages = await getImages.json();
                emptyArr.push(getImages);
            })
            setProductImage(productImage.push(emptyArr));
        })
        //console.log(productImage[0]);


    }

    const getImageDetail = () => {

    }
*/
useEffect(() => {
    const fetchOrderDetails = async () => {
        try {
            const email = JSON.parse(localStorage.getItem("user")).email;

            const response = await fetch('http://localhost:5000/getTrackOrder', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token")),
                    'Content-Type': 'application/json'
                }
            });

            const orderData = await response.json();
            setOrders(orderData);

            const allImagesPerOrder = await Promise.all(orderData.map(async (order) => {
                const imageArray = await Promise.all(order.products.map(async (productId) => {
                    const res = await fetch(`http://localhost:5000/getTrackImages/${productId}`, {
                        method: 'GET',
                        headers: {
                            authorization: JSON.parse(localStorage.getItem("token")),
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await res.json();
                    
                    // Support either single image string or array
                    if (Array.isArray(data)) {
                        return data.map(img => ({ url: img }));
                        //return data;
                    } else {
                        //return [{ url: data }];
                        return [data];
                    }
                }));

                // Flatten all images of products into one array for the order
                return imageArray.flat();
            }));

            setProductImage(allImagesPerOrder);
            //console.log(productImage); // Array of image arrays per order
            getLiveStatus();
            setLoading(false);
            

        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    fetchOrderDetails();
}, []);

    useEffect(()=>{
        
    },[])

    /*const getLiveStatus = async()=>{

        let email = localStorage.getItem("user").email;
        let result = await fetch("http://localhost:5000/getLiveTrack", {
            method: "POST",
            body: JSON.stringify({email}),
            headers: {
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        result.map((item, index)=>{
            let indexValue = status.indexOf(item.status);
            if(indexValue<0)
            {
                indexValue = 0;
            }
            setTrack(track.push(indexValue));
            //console.log(status.indexOf(item.status));
           
        });
        console.log(track);
    }*/

        const getLiveStatus = async () => {
            const email = JSON.parse(localStorage.getItem("user")).email;
        
            const result = await fetch("http://localhost:5000/getLiveTrack", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            const liveStatuses = await result.json();
        
            const updatedTrack = liveStatuses.map(item => {
                let indexValue = status.indexOf(item.status);
                console.log(item.status);
                return indexValue >= 0 ? indexValue : 0;
            });
        
            setTrack(updatedTrack);
            console.log("Track array set:", updatedTrack);
        };
        

    return (
        <>
        {loading ?
                <div className="flex flex-col w-screen items-center justify-center">
                    <Spinner />
                </div>
                :
        <>
            
            {orders && orders.length>0 ?
                <>
                    {
                        orders.map((order, index) =>
                            <div className='flex flex-row max-sm:flex-col m-10 items-center justify-center'>
                                <div className='flex object-cover items-center mt-10'>
                                    <SimpleImageSlider
                                        width={400}
                                        height={300}
                                        images={productImage[index]}
                                        showBullets={true}
                                        showNavs={true}
                                        
                                    />
                                    {console.log(productImage)}
                                </div>


                                <div className='flex flex-col items-center justify-center'>
                                    <h2 className='text-3xl font-bold mb-4'>Order Tracking</h2>
                                    <div className='flex items-center justify-center gap-4'>
                                        {status.map((step, ind) =>
                                            <div key={ind} className="flex items-center">
                                                <div
                                                    className={`h-8 w-8 rounded-full flex items-center justify-center font-bold
                            ${ind <= track[index] ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                                                >
                                                    ✓
                                                </div>
                                                {ind < status.length - 1 && (
                                                    <div className={`h-1 w-8 ${ind < track[index] ? 'bg-blue-600' : 'bg-gray-300'}`} />
                                                )}
                                                
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex mt-2 gap-10 text-sm font-medium">
                                        {status.map((step, ind) => (
                                            <div key={ind} className="w-[72px] text-center">
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
                </> :
                <div className='flex flex-row h-full w-full items-center justify-center'>
                    <div className='flex flex-col w-[400px] h-[200px] rounded-xl bg-purple-400 items-center justify-center m-10 boxshadow'>
                        <h2 className='text-2xl font-bold'>No Order yet</h2>
                        <p className='text-lg'>Please make an order to view the track status...</p>
                    </div>
                </div>
            }
        </>
}
    </>
    )
}

export default Tracking;