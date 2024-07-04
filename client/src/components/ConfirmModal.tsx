import React from "react";

interface propsModal {
    modal:{
        modal:boolean;
        itemName:String;
        idItem:any;
    }
    handleWindowModal: (itemName:String,idItem:any) => void;
    handleConfirm: () => void;
}

export const ConfirmModal = (props:propsModal) => {
    return (
        <div className={`bg-slate-800 bg-opacity-50 flex justify-center items-center top-0 right-0 bottom-0 left-0 flex-1 ${props.modal.modal ? "fixed" : "hidden"}`}>
            <div className="bg-white px-16 py-14 rounded-md text-center">
                <h1 className="text-xl mb-4 font-bold text-slate-500">Do you Want Delete {props.modal.itemName}</h1>
                <button onClick={() => props.handleWindowModal(props.modal.itemName,props.modal.idItem)} className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Cancel</button>
                <button onClick={props.handleConfirm} type="submit" className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
            </div>
        </div>
    )
}