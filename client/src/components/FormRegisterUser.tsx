import React, { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userEmail">Write your email</label>
                <input onChange={handleChange} value={fields.userEmail} type="email" name="userEmail" />
            </div>
            <div>
                <label htmlFor="userName">Write a tag name</label>
                <input onChange={handleChange} value={fields.userName} type="text" name="userName" />
            </div>
            <div>
                <label htmlFor="password">Write a password</label>
                <input onChange={handleChange} value={fields.password} type="password" name="password" />
            </div>
            <div>
                <label htmlFor="repeatPassword">Write your password again</label>
                <input onChange={handleChange} value={fields.repeatPassword} type="password" name="repeatPassword" />
            </div>
            <div>
                <label htmlFor="idCafe">Set the id from cafeteria</label>
                <input onChange={handleChange} value={fields.idCafe} type="text" name="idCafe" />
            </div>
            <div>
                <input  type="submit" value="Register user" />
            </div>
        </form>
    )
}