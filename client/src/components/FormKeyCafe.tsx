import React, { useState } from "react";

export const FormKeyCafe = () => {
    const [schoolName, setsSchoolName] = useState('');
    const [idC, setIdC] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsSchoolName(e.target.value);
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/school/getkey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ schoolName })
            });
            const data = await res.json();
            setIdC(data.keySc)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-full w-3/6 mx-auto">
            <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">Get key cafeteria</h1>
            <form onSubmit={handleSubmit} className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-[#e25d14]">
                <div className="grid">
                    <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                        <input onChange={handleChange} type="text" value={schoolName} name="schoolName" className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="School name" />
                        <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">First name</label>
                    </div>
                </div>
                <div className="grid">
                    <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                        <input type="text" name="last-name" id="last-name" className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="Here will be print the key school" value={idC !== '' ? idC : ''} readOnly/>
                        <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Your key school is</label>
                    </div>
                </div>
                <button type="submit" className="mt-4 bg-[#e25d14] text-white py-2 px-6 rounded-md hover:bg-[#bb4613] ">Consult</button>
            </form>
        </div>
    )
}