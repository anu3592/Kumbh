import React from "react";
import ProductList from "./prdouctList";
import UserList from "./UserList";



const Dash = () => {


    return (
        
            <div className="flex flex-col w-full h-full items-center justify-center ml-7 mr-7 mb-7 lg:mt-17 sm:mt-[150px] mt-10">
                <h1 className="headStyle ">Dashboard</h1>
                <div className="flex flex-row w-full h-[500px] justify-center items-center">
                    <div className="flex flex-col w-[40%] h-full rounded-2xl bg-blue-300 items-center boxshadow mt-2 mb-2 mr-2 ml-[-30px]">
                        <h2 className="headStyle m-2 text-2xl font-bold">Options</h2>
                        <button className="w-[40%] m-2 text-[1vw] dashButtons">Orders</button>
                        <button className="w-[50%] m-2 text-[1vw] dashButtons">Products</button>
                        <button className="w-[40%] m-2 text-[1vw] dashButtons">Users</button>
                    </div>

                    <div className="flex flex-row min-w-[60%] h-full bg-gray-200 rounded-lg m-2 justify-center boxshadow  overflow-x-auto">
                        <UserList/>
                    </div>
                </div>

            </div>
    
    )
}

export default Dash;