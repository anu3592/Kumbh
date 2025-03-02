import React, { useState } from "react";
import { Form } from "react-router";


const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState(null);

    const submit = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('title',title);
        formData.append('category',category);
        formData.append('price',price);
        formData.append('desc',desc);
        formData.append('img',img);

        let result = await fetch("http://localhost:5000/addProduct",{
            method: 'POST',
            body: formData,
            headers: {

            }
        });
        result = await result.json();
        console.log(result);
        
    }
    return (
        <div className="flex flex-col p-2 rounded-lg items-center justify-center mt-10 mb-5 sm:mt-20 shadow-md productForm">
            <h1 className="text-2xl headStyle text-white">Add your Product</h1>
            <form className="flex flex-col p-2 m-2 ">
                <input type="text" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the title..." onChange={(e)=>setTitle(e.target.value)}/>
                <input type="text" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the category..." onChange={(e)=>setCategory(e.target.value)}/>
                <input type="number" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the price..." onChange={(e)=>setPrice(e.target.value)}/>
                <textarea className="border-2 border-black rounded-lg p-2 m-4 bg-white" rows="4" cols="50" placeholder="Enter the product decription..." onChange={(e)=>setDesc(e.target.value)}></textarea>
                <input type="file" accept="image/*" className="border-2 border-black rounded-lg p-10 m-4 w-[300px] h-5 bg-white" onChange={(e)=>setImg(e.target.files[0])}/>
                <button type="button" className="w-[30%] text-[2vw] m-2 text-white bg-white" style={{backgroundColor:"blue"}} onClick={(e)=>submit(e)}>Add</button>
            </form>
        </div>
    );
}

export default AddProduct;