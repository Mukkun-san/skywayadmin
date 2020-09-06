import React from "react";

let Alert = ({msg , show}) => {
    return (
        <div hidden={!show} className="alert alert-danger" role="alert">
            {msg}
        </div>
    );
};


export default Alert;