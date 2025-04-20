import React, { useEffect, useState } from "react";
import { productContent } from "../data/data";
import { ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router";

const ProductDesc = () => {

    const descState = useSelector((state) => state.showD);
    // const dataToShow = descState[descState.length-1];
    // const [imgee, setImgee] = useState(dataToShow.img);

    const dataToShow = descState?.[descState.length - 1] || null;
    const [imgee, setImgee] = useState(dataToShow?.img || "");

    const [relatedProducts, setRelatedProducts] = useState(null);
    const navigate = useNavigate();
    console.log(dataToShow);


    useEffect(() => {
        if (!dataToShow) {
            setTimeout(() => {
                alert("Something went wrong. Redirecting to homepage.");
                navigate("/");
            }, 100);
        }
    }, [dataToShow, navigate]);
    

    useEffect(() => {
        (
            async () => {
                let result = await fetch(`http://localhost:5000/allProducts/${dataToShow.category}`, {
                    headers: {
                        authorization: JSON.parse(localStorage.getItem('token')),
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();
                console.log(result);
                //updateTheRealtedItems(result);
                if (!relatedProducts && result.length > 3) {
                    setRelatedProducts(result);
                    console.log(relatedProducts);

                }

            }
        )();
    })



    const addInCart = async (item) => {
        let formData = new FormData();
        formData.append("title", item.title);
        formData.append("price", item.price);
        formData.append("email", JSON.parse(localStorage.getItem("user")).email);
        formData.append("quantity", 1);
        formData.append("img", item.img);

        let result = await fetch("http://localhost:5000/addCart", {
            method: "POST",
            body: formData,
            headers: {
                authorization: JSON.parse(localStorage.getItem("token")),
            },
        });

        result = await result.json();
        console.log(result);
        alert("Product added successfully!");
    }

    /*const updateTheRealtedItems = (result)=>{
        setRelatedProducts(result);
    }*/

    if (!dataToShow) return null;

    return (
        <div className="h-[90%] max-sm:m-7 sm:mt-20">
            <div className="flex flex-row max-sm:flex-col h-full w-screen justify-center">
                <div className='w-[40%] m-3 max-sm:w-full h-[50%]'>
                    <img src={`data:image/jpg;base64,${imgee}`} className='w-full lg:h-screen h-full object-cover rounded-xl boxshadow' />
                </div>
                <div className="flex flex-col w-[60%] items-center m-4 p-2 max-sm:w-full">
                    <h1 className="headStyle">{dataToShow.title}</h1>
                    <h2 className="text-[3vw] font-bold mt-3 mb-3">Rs {dataToShow.price}</h2>
                    <p>{dataToShow.desc}</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 border rounded-lg flex flex-col items-center">
                            <ShoppingCart size={32} className="mb-2 text-blue-600" />
                            <p>Secure Checkout</p>
                        </div>
                        <div className="p-4 border rounded-lg flex flex-col items-center">
                            <Truck size={32} className="mb-2 text-green-600" />
                            <p>Free Shipping</p>
                        </div>
                        <div className="p-4 border rounded-lg flex flex-col items-center">
                            <ShieldCheck size={32} className="mb-2 text-red-600" />
                            <p>Safe Payments</p>
                        </div>
                    </div>

                    <button type="button" className="text-white mt-5 shadow-lg" style={{ backgroundColor: 'orange' }} onClick={() => addInCart(dataToShow)}>Add To Cart</button>
                </div>


            </div>

            <h1 className="text-black  text-md text-center py-2 headStyle m-2 hide">You May Also Like</h1>
            <div className='hidden lg:flex max-w[1520px] m-3 py-2 px-2'>
                <Splide options={{ perPage: 4, gap: "0.5rem", drag: "free", arrows: false }}>
                    {relatedProducts ?
                        relatedProducts.map((item) => {
                            return (
                                <SplideSlide key={item.id}>
                                    <div className='rounded-3xl relative '>
                                        <div className='absolute w-full h-full bg-black/50 rounded-3xl text-white'>
                                            <p className='px-2 pt-4 font-bold'>{item.title}</p>
                                            <p className='px-2'>{item.price}</p>
                                            <button className='border-dotted border-white text-white mx-2 absolute bottom-4 ' style={{ backgroundColor: '#FFD700' }} onClick={() => addInCart(item)}>Add To Cart</button>
                                        </div>
                                        <img className='h-[200px] w-full object-cover rounded-3xl cursor-pointer hover:scale-105 ease-out duration-300'
                                            src={`data:image/jpg;base64,${item.img}`} alt={item.title} />
                                    </div>
                                </SplideSlide>
                            )
                        }) : <></>
                    }
                </Splide>
            </div>
        </div>

    );
}

export default ProductDesc;