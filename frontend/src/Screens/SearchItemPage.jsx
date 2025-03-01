import React, { useState } from "react";
import { productContent } from "../data/data";

const SearchItemPage = () => {
    const [products, setProducts] = useState(productContent);

    const filterByPrice = () => {
        setProducts([...products].sort((a, b) => a.price - b.price));
    };

    const filterBySize = () => {
        setProducts([...products].sort((a, b) => a.size.localeCompare(b.size)));
    };

    const filterByCategory = (category) => {
        setProducts(
            category === "all" ? productContent : productContent.filter((item) => item.category === category)
        );
    };

    return (
        <div className="flex h-[90%] max-sm:m-7 sm:mt-21">
        <div className="flex flex-col w-screen items-center mt-9 p-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <h2 className="text-[2.5vw] font-bold" id="filter">Filters:</h2>
                <select name="price" className="border-1 rounded-lg p-2">
                    <option>Select Price Range:</option>
                    <option>below 1000</option>
                    <option>1000-5000</option>
                    <option>5000-15000</option>
                    <option>above 15000</option>
                </select>
                <select name="size" className="border-1 rounded-lg p-2">
                    <option>Select Size:</option>
                    <option>below 5 inches</option>
                    <option>5-20 inches</option>
                    <option>21-40 inches</option>
                    <option>above 40 inches</option>
                </select>
                <select name="category" className="border-1 rounded-lg p-2">
                    <option>Select Category:</option>
                    <option>statue</option>
                    <option>vase</option>
                    <option>pot</option>
                    <option>other</option>
                </select>
                
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 w-full max-w-screen-xl">
                {products.map((item) => (
                    <div key={item.id} className="border-none hover:scale-105 duration-300 boxshadow rounded-lg overflow-hidden">
                        <img src={item.img} className="w-full h-[200px] object-cover" alt={item.title} />
                        <div className="p-4">
                            <p className="font-bold font-serif">{item.title}</p>
                            <p className="bg-purple-300 text-white px-3 py-1 inline-block rounded-lg mt-2">{item.price}</p>
                        </div>
                        <button className="w-[80%] py-2 bg-orange-500 text-white rounded-b-lg m-2" style={{backgroundColor: 'rgb(225,69,0)'}}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default SearchItemPage;