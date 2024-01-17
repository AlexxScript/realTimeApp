import React from 'react';
import { FormKeyCafe } from '../components/FormKeyCafe';
import { FormRegisterUser } from '../components/FormRegisterUser';


export const RegisterUser = () => {
    return (
        <div>
            <FormRegisterUser/>
            <FormKeyCafe/>
        </div>

    );
}