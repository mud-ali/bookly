import React from "react";
import "../css/errorModal.css";


const ErrorModal = (props: {message: string}) => {
    return (
        <div className="error-modal w-[15vw] p-8 fixed z-10 left-44 rounded-lg opacity-80 border-2 border-white">
            <h1>Error</h1>
            <p>{props.message}</p>
        </div>
    );
}

export default ErrorModal;