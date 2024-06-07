import React from "react"
import { useParams } from "react-router-dom"

export const UpdateLunch = () => {
    const {lunchId} = useParams();
    return (
        <h1>
            {lunchId}
        </h1>
    )
}