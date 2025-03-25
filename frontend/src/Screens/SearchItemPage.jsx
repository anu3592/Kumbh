import React, { useEffect, useState } from "react";
import { productContent } from "../data/data";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showDesc } from "../actions";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../SupportScreens/Spinner";

const SearchItemPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered results
    const [selectedPrice, setSelectedPrice] = useState(""); // State for selected price filter
    const [selectedSize, setSelectedSize] = useState(""); // State for selected size filter
    const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category filter
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let searchedProduct = localStorage.getItem("search") || "";

            let searchResult = await fetch(`http://localhost:5000/search/${searchedProduct}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token")),
                    "Content-Type": "application/json",
                },
            });

            searchResult = await searchResult.json();
            if (searchResult.length > 0) {
                setProducts(searchResult);
                setFilteredProducts(searchResult);
                setLoading(false);
                console.log(searchResult);
            }
            else{
                setLoading(false);
            }
        })();
    }, []);

    // Apply Filters
    useEffect(() => {
        let tempProducts = [...products];

        // Filter by Category
        if (selectedCategory !== "all") {
            tempProducts = tempProducts.filter((item) => item.category === selectedCategory);
        }

        // Filter by Price
        if (selectedPrice) {
            tempProducts = tempProducts.filter((item) => {
                if (selectedPrice === "below 1000") return item.price < 1000;
                if (selectedPrice === "1000-5000") return item.price >= 1000 && item.price <= 5000;
                if (selectedPrice === "5000-15000") return item.price > 5000 && item.price <= 15000;
                if (selectedPrice === "above 15000") return item.price > 15000;
                return true;
            });
        }

        // Filter by Size (assuming size is stored as a number)
        if (selectedSize) {
            tempProducts = tempProducts.filter((item) => {
                if (selectedSize === "below 5 inches") return item.size < 5;
                if (selectedSize === "5-20 inches") return item.size >= 5 && item.size <= 20;
                if (selectedSize === "21-40 inches") return item.size > 20 && item.size <= 40;
                if (selectedSize === "above 40 inches") return item.size > 40;
                return true;
            });
        }

        setFilteredProducts(tempProducts);
    }, [selectedPrice, selectedSize, selectedCategory, products]);

    const sendProdDesc = (item) => {
        dispatch(showDesc(item));
    };

    const addInTheCart = async (item) => {
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
        window.location.reload();
    };

    return (
        <div className="flex h-[90%] max-sm:m-7 sm:mt-21 w-[97%]">
            {loading ?
                <div className="flex flex-col w-screen items-center justify-center">
                    <Spinner />
                </div>
                :
                <div className="flex flex-col w-screen items-center mt-9 p-4">
                    {/* Filter Buttons */}
                    {products.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            <h2 className="text-[2.5vw] font-bold">Filters:</h2>

                            <select
                                name="price"
                                className="border-1 rounded-lg p-2"
                                onChange={(e) => setSelectedPrice(e.target.value)}
                            >
                                <option value="">Select Price Range:</option>
                                <option value="below 1000">below 1000</option>
                                <option value="1000-5000">1000-5000</option>
                                <option value="5000-15000">5000-15000</option>
                                <option value="above 15000">above 15000</option>
                            </select>

                            <select
                                name="size"
                                className="border-1 rounded-lg p-2"
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                <option value="">Select Size:</option>
                                <option value="below 5 inches">below 5 inches</option>
                                <option value="5-20 inches">5-20 inches</option>
                                <option value="21-40 inches">21-40 inches</option>
                                <option value="above 40 inches">above 40 inches</option>
                            </select>

                            <select
                                name="category"
                                className="border-1 rounded-lg p-2"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="statue">Statue</option>
                                <option value="vase">Vase</option>
                                <option value="pot">Pot</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    )}

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 w-full max-w-screen-xl">
                            {filteredProducts.map((item) => (
                                <div key={item._id} className="border-none hover:scale-105 duration-300 boxshadow rounded-lg overflow-hidden">
                                    <img src={`data:image/jpg;base64,${item.img}`} className="w-full h-[200px] object-cover" alt={item.title} />
                                    <div className="p-4">
                                        <Link to="/desc">
                                            <p className="font-bold font-serif text-black cursor-pointer" onClick={() => sendProdDesc(item)}>
                                                {item.title}
                                            </p>
                                        </Link>
                                        <p className="bg-purple-300 text-white px-3 py-1 inline-block rounded-lg mt-2">{item.price}</p>
                                    </div>
                                    <button
                                        className="w-[80%] py-2 bg-orange-500 text-white rounded-b-lg m-2"
                                        style={{ backgroundColor: "rgb(225,69,0)" }}
                                        onClick={() => addInTheCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-10 m-3 w-[80%] h-[60%] rounded-lg bg-red-400">
                            <h1 className="text-[3vw]">No Item Found</h1>
                            <p>Please check the other products....</p>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default SearchItemPage;
