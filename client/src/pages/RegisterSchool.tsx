import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

export const RegisterSchool = () => {

    const [fields, setFields] = useState({
        schoolName: '',
        passwordSchool: '',
        repeatPasswordSchool: ''
    });
    const [change, setChange] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/school/newschool', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fields)
            })
            const data = await res.json();
            console.log(data);
            if (data.message === 'School created')
                setChange(true);
        } catch (error) {
            console.log(error);
        }
    }

    if (change) return <Navigate to={`/register`} />

    return (
        <>
            <NavBar/>
            <div className="bg-white">
                <div className="flex h-screen flex-col items-center justify-center">
                    <div className="shadow rounded-3xl sm:p-10 p-5 max-h-auto mx-auto w-4/6 max-w-xl">
                        <div className="mb-5 space-y-1">
                            <p className="text-xl font-semibold">Register school</p>
                            <p className="text-gray-500">Enter necessary data to register</p>
                        </div>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-10 space-y-3">
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">School name</label>
                                        <input
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="School name"
                                            onChange={handleChange}
                                            type="email"
                                            name="schoolName"
                                            value={fields.schoolName} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                        <input
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            value={fields.passwordSchool}
                                            type="password"
                                            name="passwordSchool" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">password</label>
                                        <input
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="your password"
                                            onChange={handleChange}
                                            value={fields.repeatPasswordSchool}
                                            type="password"
                                            name="repeatPasswordSchool" />
                                    </div>
                                </div>
                                <button className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-[#e25d14] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#bb4613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}