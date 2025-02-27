import React, { useState } from "react";
import { productContent } from "../data/data";
import { ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const ProductDesc = () => {
    const [imgee, setImgee] = useState(productContent[0].img);
    return (
        <div className="h-[90%] max-sm:m-7 sm:mt-17">
            <div className="flex flex-row max-sm:flex-col h-full w-full">
                <div className='w-[40%] m-3 max-sm:w-full'>
                    <img src={imgee} className='w-full lg:h-screen h-full object-cover rounded-xl boxshadow' />
                </div>
                <div className="flex flex-col w-[60%] items-center m-4 p-2 max-sm:w-full">
                    <h1 className="headStyle">Statue</h1>
                    <h2 className="text-[3vw] font-bold mt-3 mb-3">Rs 15000</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised
                        in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including
                        versions of Lorem Ipsum.</p>

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

                    <button type="button" className="text-white mt-5 shadow-lg" style={{ backgroundColor: 'orange' }}>Move To Checkout Page</button>
                </div>

                
            </div>

            <h1 className="text-black  text-md text-center py-2 headStyle m-2 hide">You May Also Like</h1>
                <div className='hidden lg:flex max-w[1520px] m-3 py-2 px-2'>
                    <Splide options={{ perPage: 4, gap: "0.5rem", drag: "free", arrows: false }}>
                        {
                            productContent.map((item) => {
                                return (
                                    <SplideSlide key={item.id}>
                                        <div className='rounded-3xl relative'>
                                            <div className='absolute w-full h-full bg-black/50 rounded-3xl text-white'>
                                                <p className='px-2 pt-4 font-bold'>{item.title}</p>
                                                <p className='px-2'>{item.price}</p>
                                                <button className='border-dotted border-white text-white mx-2 absolute bottom-4' style={{backgroundColor: '#FFD700'}}>Add To Cart</button>
                                            </div>
                                            <img className='h-[200px] w-full object-cover rounded-3xl cursor-pointer hover:scale-105 ease-out duration-300'
                                                src={item.img} alt={item.title} />
                                        </div>
                                    </SplideSlide>
                                )
                            })
                        }
                    </Splide>
                </div>
        </div>
        
    );
}

export default ProductDesc;