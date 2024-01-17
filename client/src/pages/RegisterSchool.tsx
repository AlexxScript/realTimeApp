import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const RegisterSchool = () => {

    const [fields,setFields] = useState({
        schoolName:'',
        passwordSchool:'',
        repeatPasswordSchool:''
    });
    const [change,setChange] = useState(false);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/school/newschool',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(fields)
            })
            const data = await res.json();
            console.log(data);
            if(data.message === 'School created') 
                setChange(true);
        } catch (error) {
            console.log(error);
        }
    }

    if (change) return <Navigate to={`/register`}/>

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="schoolName">Set school name</label>
                <input onChange={handleChange} value={fields.schoolName} type="text" name="schoolName" placeholder='School name' />
            </div>
            <div>
                <label htmlFor="passwordSchool">Set a password or key to protect admin dashboard</label>
                <input onChange={handleChange} value={fields.passwordSchool} type="password" name="passwordSchool" placeholder='Password or key' />
            </div>
            <div>
                <label htmlFor="repeatPasswordSchool">Repeat password</label>
                <input onChange={handleChange} value={fields.repeatPasswordSchool} type="password" name="repeatPasswordSchool" placeholder='Repeat password' />
            </div>
            <div>
                <label htmlFor="registerSchool">Register school</label>
                <input type="submit" value="Register school" />
            </div>
        </form>
    );
}