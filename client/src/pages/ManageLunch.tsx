import React from "react";
import { FormCreateLunch } from "../components/FormCreateLunch";
import { ListItems } from "../components/ListItems";

export const ManageLunch = () => {
    return (
        <div>
            <FormCreateLunch/>
            <ListItems/>
        </div>
    )
}