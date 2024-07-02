import React from "react";
import { FormCreateLunch } from "../components/FormCreateLunch";
import { ListItems } from "../components/ListItems";
import { ConfirmModal } from "../components/ConfirmModal";

export const ManageLunch = () => {
    return (
        <div>
            <section className="mainContent">
                <FormCreateLunch />
                <ListItems />
            </section>
        </div>
    )
}