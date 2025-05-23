import React, { useState } from "react";
import Hari from "../assets/images/Shree_Hari_Narayan.jpeg";
import { productContent } from "../data/data";

const Home = () => {
  const [products, setProducts] = useState(productContent);

  const filterCat = (category) => {
    setProducts(
      productContent.filter((item) => {
        return item.category === category;
      })
    );
  };
  const filterAllCat = (data) => {
    setProducts(data);
  };

  const addInCart = async (item)=>{
    let formData = new FormData();
        formData.append("title", item.title);
        formData.append("price", item.cost);
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

  return (
    <div className="flex h-[90%] max-sm:m-7 sm:mt-17">
      <div className="flex flex-col w-full h-full z-10 mt-9 justify-center">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 py-4 w-full m-3">
          <div className="flex flex-col items-center m-2">
            <h1 className="m-2">Welcome Govind</h1>
            <p className="m-2">
            At Kumbh, we believe that beautiful, sustainable living should be accessible to everyone.
            Our collection of handcrafted clay pots, vases, planters, and home décor items is designed to bring nature into your home while being kind to the planet. 
            Made from natural, eco-friendly materials, each piece is carefully crafted to add charm, warmth, and personality to your space. 
            Whether you're looking to enhance your garden, elevate your indoor décor, or fyind the perfect gift, our products offer the perfect balance of style, sustainability, and quality. 
            Join us in creating a greener future, one beautiful piece at a time.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-2xl object-cover bg-gray-200 shadow-lg m-2">
            <img src={Hari} className="rounded-2xl object-cover" />
          </div>
        </div>
        {/*--------------categories-------------------------*/}
        <div id="catFont" className="flex flex-col w-full items-center">
          <h1 className="text-orange-600">Categories</h1>
          <div className="flex flex-row justify-between items-center m-3">
            <button
              type="button"
              className="m-2 text-white"
              style={{ backgroundColor: "skyblue" }}
              onClick={() => filterAllCat(productContent)}
            >
              All
            </button>
            <button
              type="button"
              className="m-2 text-white"
              style={{ backgroundColor: "skyblue" }}
              onClick={() => filterCat("statue")}
            >
              Staues
            </button>
            <button
              type="button"
              className="m-2 text-white"
              style={{ backgroundColor: "skyblue" }}
              onClick={() => filterCat("vase")}
            >
              Vase
            </button>
            <button
              type="button"
              className="m-2 text-white"
              style={{ backgroundColor: "skyblue" }}
              onClick={() => filterCat("pot")}
            >
              Pot
            </button>
          </div>

          <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-6 py-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="border-none hover:scale-105 duration-300"
              >
                <img
                  src={item.img}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <div className="flex justify-between py-2 px-2">
                  <p className="font-bold font-serif">{item.title}</p>
                  <p className="bg-orange-700 h-18 w-18 rounded-lg -mt-10 text-white p-3 border-8">
                    {item.price}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-2xl text-white shadow-md"
                  style={{ backgroundColor: "orange" }}
                  onClick={()=>addInCart(item)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
