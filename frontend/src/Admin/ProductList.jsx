import { Link } from "react-router";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const ProductList = () => {
    const [products, setProducts] = useState(null);
    const [searchProduct, setSearchProduct] = useState("");

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/getAll", {
            method: "GET",
            headers: {
                authorization: JSON.parse(localStorage.getItem("token"))
            }
        });

        result = await result.json();
        setProducts(result);
    }

    const deleteTheProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            let result = await fetch(`http://localhost:5000/deleteProduct/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token")),
                }
            });
            result = await result.json();
            console.log(result);
            if (result.acknowledged) {
                alert("Item deleted successfully!");
            }
            getProducts();
        }
    }

    const searchItem = async()=>{
        let result = await fetch(`http://localhost:5000/searchDashProduct/${searchProduct}`,{
            method: "GET",
            headers: {
                authorization: JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        console.log(result);
        // let ans = [];
        // ans.push(result);
        if(result)
        {
            setProducts(result);
        }
    }

    return (
        <div className="flex flex-col m-3">
            <h2 className="headStyle text-4xl">Products</h2>
            <div className="flex flex-row m-2">
            <FaSearch size={25} className="m-2 text-white h-[50px] w-[50px] p-2 mr-[-2px] mt-[-0.25px] rounded-l-md cursor-pointer" onClick={()=>searchItem()}/>
                <input type="text" placeholder="search here..." className="rounded-r-md w-[200px] h-[50px] p-2 focus:outline-none bg-white" value={searchProduct} onChange={(e)=>setSearchProduct(e.target.value)}/>   
            </div>
            <table>
                {products ?
                    <tbody>
                        {products.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td className="w-[50px] h-[50px] rounded-full"><img src={`data:image/jpg;base64,${item.img}`} /></td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td><Link to={"/update/" + item.id}>Update</Link></td>
                                <td><FaTrash size={20} className="cursor-pointer" onClick={() => deleteTheProduct(item.id)} /></td>
                            </tr>)
                        )}
                    </tbody> : <></>
                }
            </table>
        </div>
    )
}

export default ProductList;