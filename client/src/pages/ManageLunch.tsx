import React from "react";
import { FormCreateLunch } from "../components/FormCreateLunch";
import { ListItems } from "../components/ListItems";

export const ManageLunch = () => {
    return (
        <div>
            <h1>Manage lunches</h1>
            <section className="mainContent">
            <FormCreateLunch/>
            <ListItems/>
            </section>
        </div>
    )
}