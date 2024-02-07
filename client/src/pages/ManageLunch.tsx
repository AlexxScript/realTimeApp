import React from "react";
import { FormCreateLunch } from "../components/FormCreateLunch";
import { ListItems } from "../components/ListItems";

export const ManageLunch = () => {
    return (
        <div className='mainContent'>
            <h1>Manage lunches</h1>
            <FormCreateLunch/>
            <ListItems/>
        </div>
    )
}