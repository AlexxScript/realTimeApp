import React from "react";

export const FormCreateLunch = () => {
    return (
        <form action="">
            <div>
                <label htmlFor="">Lunch name</label>
                <input type="text" name="nameLunch" />
            </div>
            <div>
                <label htmlFor="">Lunch description</label>
                <input type="text" name="descriptionLunch" />
            </div>
            <div>
                <label htmlFor="">Lunch price</label>
                <input type="text" name="priceLunch" />
            </div>
            <div>
                <label htmlFor="">Lunch available</label>
                <input type="checkbox" name="availableLunch" id="" />
            </div>
        </form>
    )
}