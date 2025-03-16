import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const ProductList = () => {
    const [products, setProducts] = useState(null);

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

    return (
        <div className="flex flex-col m-3">
            <h2 className="headStyle text-4xl">Products</h2>
            <table>
                {products ?
                    <tbody>
                        {products.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td className="w-[50px] h-[50px] rounded-full"><img src={`data:image/jpg;base64,${item.img}`} /></td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
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