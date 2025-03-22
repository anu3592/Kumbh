import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";



const UpdateProduct = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState(null);
    const [size, setSize] = useState(0);
    const navigate = useNavigate();
    const params = useParams();

    const submit = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('title',title);
        formData.append('category',category);
        formData.append('price',price);
        formData.append('desc',desc);
        formData.append('size', size);
        formData.append('img',img);

        let result = await fetch(`http://localhost:5000/updateProduct/${params.id}`,{
            method: "PUT",
            body: formData,
            headers: {
                authorization: JSON.parse(localStorage.getItem("token")),
            }
        });
        result = await result.json();
        console.log(result);
        if(result.title)
        {
            alert("Item update successfully!");
            navigate('/dash');
        }
    }

    return (
        <div className="flex flex-col p-2 rounded-lg items-center justify-center mt-10 mb-5 sm:mt-20 shadow-md bg-indigo-100">
            <h1 className="text-2xl headStyle text-black/50">Update Product</h1>
            <form className="flex flex-col p-2 m-2 ">
                <input type="text" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the title..." onChange={(e) => setTitle(e.target.value)} />
                <input type="text" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the category..." onChange={(e) => setCategory(e.target.value)} />
                <input type="number" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the price..." onChange={(e) => setPrice(e.target.value)} />
                <input type="number" className="border-2 border-black rounded-lg p-5 m-4 w-[300px] h-5 bg-white" placeholder="Enter the size in inches..." onChange={(e) => setSize(e.target.value)} />
                <textarea className="border-2 border-black rounded-lg p-2 m-4 bg-white" rows="4" cols="50" placeholder="Enter the product decription..." onChange={(e) => setDesc(e.target.value)}></textarea>
                <input type="file" accept="image/*" className="border-2 border-black rounded-lg p-10 m-4 w-[300px] h-5 bg-white" onChange={(e) => setImg(e.target.files[0])} />
                <button type="button" className="w-[30%] text-[2vw] m-2 text-white bg-white" style={{ backgroundColor: "blue" }} onClick={(e) => submit(e)}>Update</button>
            </form>
        </div>
    )
}

export default UpdateProduct;