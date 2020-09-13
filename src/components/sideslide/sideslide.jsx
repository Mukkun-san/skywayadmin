import React from "react";
import style from "./sideslide.module.css";

let closeImg = require("../../assets/close.svg");

const SideSlide = ({ children, show, hideRSideBar, title }) => {
    return show === true ? (
        <div hidden={!show} className={style.sideslide}>
            <div className={style.content}>
                <div
                    style={{
                        display: "flex",
                        padding: "30px 30px 10px 30px",
                        justifyContent: "space-between",
                        boxShadow: '1px 1px 15px #ddd'
                    }}
                >
                    <h2>{title}</h2>
                    <img
                        width={20}
                        height={20}
                        src={closeImg}
                        style={{ position: "relative", top: "10px" }}
                        alt="close btn"
                        onClick={() => hideRSideBar()}
                    />
                </div>
                {children}
            </div>
        </div>
    ) : ''
        ;
};

export default SideSlide;
