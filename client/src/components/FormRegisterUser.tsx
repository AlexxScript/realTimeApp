import React, { useState } from "react";
import { NavBar } from "./NavBar";

export const FormRegisterUser = () => {
    
    const [fields,setFields] = useState({
        userEmail:"",
        userName:"",
        password:"",
        repeatPassword:"",
        idCafe:""
    })
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/user/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(fields)
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <NavBar/>
            <div className="bg-white">
                <div className="flex h-screen flex-col items-center justify-center">
                    <div className="rounded-md border-2 border-[#e25c148a] max-h-auto mx-auto w-4/6 max-w-xl p-5">
                        <div className="mb-5 space-y-1">
                            <p className="text-xl font-semibold">Register user</p>
                            <p className="text-gray-500">Enter necessary data to register</p>
                        </div>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-10 space-y-3">
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                        <input 
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                            placeholder="mail@example.com" 
                                            onChange={handleChange} 
                                            type="email" 
                                            name="userEmail"
                                            value={fields.userEmail}/>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tag name</label>
                                        <input 
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                            placeholder="your tag name" 
                                            onChange={handleChange}
                                            value={fields.userName} 
                                            type="text" 
                                            name="userName"/>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">password</label>
                                        <input 
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                            placeholder="your password" 
                                            onChange={handleChange}
                                            value={fields.password} 
                                            type="password" 
                                            name="password"/>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Write your password again</label>
                                        <input 
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                            placeholder="your password" 
                                            onChange={handleChange}
                                            value={fields.repeatPassword} 
                                            type="password" 
                                            name="repeatPassword"/>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Set id from the cafeteri</label>
                                        <input 
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                            placeholder="your password" 
                                            onChange={handleChange}
                                            value={fields.idCafe} 
                                            type="text" 
                                            name="idCafe"/>
                                    </div>
                                </div>
                                <button className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-[#e25d14] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#bb4613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}