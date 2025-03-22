import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const UserList = () => {
    const [users, setUsers] = useState(null);
    const [searchUser, setSearchUser] = useState("");

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

    const deleteTheUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            let result = await fetch(`http://localhost:5000/deleteUser/${id}`, {
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

    const searchUserFunction = async()=>{
        let result = await fetch(`http://localhost:5000/searchDashUser/${searchUser}`,{
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
            setUsers(result);
        }
    }

    return (
        <div className="flex flex-col m-3">
            <h2 className="headStyle text-4xl">Users</h2>
            <div className="flex flex-row m-2">
                <FaSearch size={25} className="m-2 text-white h-[50px] w-[50px] p-2 mr-[-2px] mt-[-0.25px] rounded-l-md cursor-pointer" onClick={()=>searchUserFunction()}/>
                <input type="text" placeholder="search here..." className="rounded-r-md w-[200px] h-[50px] p-2 focus:outline-none bg-white" value={searchUser} onChange={(e)=>setSearchUser(e.target.value)}/>
            </div>
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