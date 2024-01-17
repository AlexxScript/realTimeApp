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
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Get the cafeteria key</h2>
                <div>
                    <label htmlFor="schoolName">Write your school name</label>
                    <input onChange={handleChange} type="text" value={schoolName} name="schoolName" />
                </div>
                <div>
                    <input type="submit" value="Consult" />
                </div>
            </form>
            {idC !== '' && (
                <h1>{idC}</h1>
            )}
        </div>
    )
}