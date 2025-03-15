import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const UserList = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        let result = await fetch("http://localhost:5000/getAllUsers", {
            method: "GET",
            headers: {
                authorization: JSON.parse(localStorage.getItem("token")),
            }
        });
        result = await result.json();

        setUsers(result);
    }

    const deleteTheUser = async(id)=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            let result = await fetch(`http://localhost:5000/deleteUser/${id}`,{
                method: "DELETE",
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token")),
                }
            });
            result = await result.json();
            if (result.acknowledged) {
                alert("User deleted successfully!");
            }
            getUsers();
        }
    }

    return (
        <div className="flex flex-col m-3">
            <h2 className="headStyle text-4xl">Users</h2>
            <table>
                {users ?
                    <tbody>
                        {users.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td><FaTrash size={20} className="cursor-pointer" onClick={() => deleteTheUser(item.id)} /></td>
                            </tr>)
                        )}
                    </tbody> : <></>
                }
            </table>
        </div>
    )
}

export default UserList;