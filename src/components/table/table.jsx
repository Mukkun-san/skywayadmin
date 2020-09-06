import React from "react";

const Table = ({ children }) => {
    return (
        <table
            style={{ backgroundColor: "white", boxShadow: "1px 1px 15px #ddd" , width : '100%' }}
            className={"table table-striped responsive"}
        >
            {children}
        </table>
    );
};

export default Table;
